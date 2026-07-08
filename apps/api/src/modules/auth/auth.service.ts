import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { randomInt } from "node:crypto";
import {
  AUTH_REPOSITORY,
  MAX_FAILED_LOGIN_ATTEMPTS,
  OTP_TTL_MINUTES,
  PASSWORD_RESET_TTL_MINUTES
} from "./auth.constants.js";
import { AuthRepository } from "./auth.repository.js";
import { LoginWithPasswordDto, RegisterWithPasswordDto } from "./dto/auth.dto.js";
import { LoginResult } from "./auth.types.js";
import { PasswordService } from "./password.service.js";
import { TokenService } from "./token.service.js";

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly repository: AuthRepository,
    private readonly passwords: PasswordService,
    private readonly tokens: TokenService
  ) {}

  async registerWithPassword(dto: RegisterWithPasswordDto): Promise<LoginResult> {
    const existing = await this.repository.findCredentialByEmail(dto.email, dto.tenantId ?? null);
    if (existing) {
      throw new BadRequestException("An account already exists for this email.");
    }

    const passwordHash = await this.passwords.hashPassword(dto.password);
    const user = await this.repository.createCredential({
      tenantId: dto.tenantId ?? null,
      email: dto.email,
      mobile: null,
      passwordHash
    });

    await this.repository.audit("AUTH_REGISTERED", user.id, user.tenantId, { method: "password" });
    return this.issueLogin(user, false);
  }

  async loginWithPassword(dto: LoginWithPasswordDto): Promise<LoginResult> {
    const user = await this.repository.findCredentialByEmail(dto.email, dto.tenantId ?? null);
    if (!user || !user.passwordHash || user.status !== "ACTIVE") {
      throw new UnauthorizedException("Invalid credentials.");
    }

    if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
      throw new UnauthorizedException("Account is temporarily locked.");
    }

    const passwordValid = await this.passwords.verifyPassword(dto.password, user.passwordHash);
    if (!passwordValid) {
      const shouldLock = user.failedLoginAttempts + 1 >= MAX_FAILED_LOGIN_ATTEMPTS;
      await this.repository.recordFailedLogin(user.id, shouldLock ? new Date(Date.now() + 15 * 60 * 1000) : null);
      await this.repository.audit("AUTH_LOGIN_FAILED", user.id, user.tenantId, { reason: "invalid_password" });
      throw new UnauthorizedException("Invalid credentials.");
    }

    await this.repository.clearFailedLogins(user.id);
    await this.repository.audit("AUTH_LOGIN_SUCCEEDED", user.id, user.tenantId, { method: "password" });
    return this.issueLogin(user, user.mfaEnabled);
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const session = await this.repository.findSessionByRefreshTokenHash(this.tokens.hashOpaqueToken(refreshToken));
    if (!session) {
      throw new UnauthorizedException("Invalid refresh token.");
    }

    const newRefreshToken = this.tokens.createRefreshToken();
    await this.repository.rotateRefreshToken(session.id, this.tokens.hashOpaqueToken(newRefreshToken), this.tokens.getRefreshExpiry());

    return {
      accessToken: this.tokens.createAccessToken({
        id: session.userId,
        tenantId: session.tenantId,
        email: null,
        mobile: null,
        roles: [],
        mfaEnabled: false
      }),
      refreshToken: newRefreshToken
    };
  }

  async logout(refreshToken: string) {
    await this.repository.revokeSessionByRefreshTokenHash(this.tokens.hashOpaqueToken(refreshToken));
    return { revoked: true };
  }

  async requestMobileOtp(mobile: string, tenantId: string | null) {
    const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
    const codeHash = this.tokens.hashOpaqueToken(`${mobile}:${code}`);
    await this.repository.createOtp(mobile, tenantId, codeHash, new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000));
    await this.repository.enqueueAuthMessage(tenantId, "SMS", mobile, "AUTH_LOGIN_OTP", { code, expiresInMinutes: OTP_TTL_MINUTES });
    await this.repository.audit("AUTH_OTP_REQUESTED", null, tenantId, { mobile });
    return { delivery: "queued", expiresInMinutes: OTP_TTL_MINUTES };
  }

  async verifyMobileOtp(mobile: string, tenantId: string | null, code: string): Promise<LoginResult> {
    const valid = await this.repository.consumeOtp(mobile, tenantId, this.tokens.hashOpaqueToken(`${mobile}:${code}`));
    if (!valid) {
      throw new UnauthorizedException("Invalid or expired OTP.");
    }

    const user = await this.repository.findCredentialByMobile(mobile, tenantId);
    if (!user) {
      throw new UnauthorizedException("No account is linked to this mobile number.");
    }

    await this.repository.audit("AUTH_LOGIN_SUCCEEDED", user.id, user.tenantId, { method: "mobile_otp" });
    return this.issueLogin(user, user.mfaEnabled);
  }

  async forgotPassword(email: string, tenantId: string | null) {
    const user = await this.repository.findCredentialByEmail(email, tenantId);
    if (!user) {
      return { delivery: "queued" };
    }

    const resetToken = this.tokens.createRefreshToken();
    await this.repository.createPasswordReset(
      user.id,
      this.tokens.hashOpaqueToken(resetToken),
      new Date(Date.now() + PASSWORD_RESET_TTL_MINUTES * 60 * 1000)
    );
    await this.repository.enqueueAuthMessage(user.tenantId, "EMAIL", email, "AUTH_PASSWORD_RESET", {
      resetToken,
      expiresInMinutes: PASSWORD_RESET_TTL_MINUTES
    });
    await this.repository.audit("AUTH_PASSWORD_RESET_REQUESTED", user.id, user.tenantId, {});

    return { delivery: "queued" };
  }

  async resetPassword(resetToken: string, newPassword: string) {
    const updated = await this.repository.consumePasswordReset(
      this.tokens.hashOpaqueToken(resetToken),
      await this.passwords.hashPassword(newPassword)
    );
    if (!updated) {
      throw new UnauthorizedException("Invalid or expired password reset token.");
    }

    return { reset: true };
  }

  private async issueLogin(user: LoginResult["user"], requiresMfa: boolean): Promise<LoginResult> {
    const refreshToken = this.tokens.createRefreshToken();
    const session = await this.repository.createSession({
      userId: user.id,
      tenantId: user.tenantId,
      refreshTokenHash: this.tokens.hashOpaqueToken(refreshToken),
      expiresAt: this.tokens.getRefreshExpiry()
    });

    return {
      user,
      accessToken: requiresMfa ? this.tokens.createMfaChallengeToken(user) : this.tokens.createAccessToken(user),
      refreshToken,
      sessionId: session.id,
      requiresMfa
    };
  }
}
