import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHmac, randomBytes } from "node:crypto";
import { ACCESS_TOKEN_TTL_SECONDS, REFRESH_TOKEN_TTL_SECONDS } from "./auth.constants.js";
import { AuthenticatedUser } from "./auth.types.js";

interface JwtPayload {
  sub: string;
  tenantId: string | null;
  roles: string[];
  typ: "access" | "mfa_challenge";
  exp: number;
  iat: number;
}

@Injectable()
export class TokenService {
  constructor(private readonly config: ConfigService) {}

  createAccessToken(user: AuthenticatedUser): string {
    return this.sign({
      sub: user.id,
      tenantId: user.tenantId,
      roles: user.roles,
      typ: "access",
      iat: this.now(),
      exp: this.now() + ACCESS_TOKEN_TTL_SECONDS
    });
  }

  createMfaChallengeToken(user: AuthenticatedUser): string {
    return this.sign({
      sub: user.id,
      tenantId: user.tenantId,
      roles: user.roles,
      typ: "mfa_challenge",
      iat: this.now(),
      exp: this.now() + 5 * 60
    });
  }

  createRefreshToken(): string {
    return randomBytes(48).toString("base64url");
  }

  getRefreshExpiry(): Date {
    return new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000);
  }

  hashOpaqueToken(token: string): string {
    return createHmac("sha256", this.config.getOrThrow<string>("JWT_REFRESH_SECRET")).update(token).digest("base64url");
  }

  private sign(payload: JwtPayload): string {
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
    const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = createHmac("sha256", this.config.getOrThrow<string>("JWT_ACCESS_SECRET"))
      .update(`${header}.${body}`)
      .digest("base64url");
    return `${header}.${body}.${signature}`;
  }

  private now(): number {
    return Math.floor(Date.now() / 1000);
  }
}
