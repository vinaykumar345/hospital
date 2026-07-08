import { AuthSession, CredentialRecord } from "./auth.types.js";

export interface CreateCredentialInput {
  tenantId: string | null;
  email: string | null;
  mobile: string | null;
  passwordHash: string | null;
}

export interface CreateSessionInput {
  userId: string;
  tenantId: string | null;
  refreshTokenHash: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
}

export interface AuthRepository {
  createCredential(input: CreateCredentialInput): Promise<CredentialRecord>;
  findCredentialByEmail(email: string, tenantId: string | null): Promise<CredentialRecord | null>;
  findCredentialByMobile(mobile: string, tenantId: string | null): Promise<CredentialRecord | null>;
  recordFailedLogin(userId: string, lockedUntil: Date | null): Promise<void>;
  clearFailedLogins(userId: string): Promise<void>;
  createSession(input: CreateSessionInput): Promise<AuthSession>;
  findSessionByRefreshTokenHash(refreshTokenHash: string): Promise<AuthSession | null>;
  rotateRefreshToken(sessionId: string, refreshTokenHash: string, expiresAt: Date): Promise<void>;
  revokeSessionByRefreshTokenHash(refreshTokenHash: string): Promise<void>;
  createOtp(mobile: string, tenantId: string | null, codeHash: string, expiresAt: Date): Promise<void>;
  consumeOtp(mobile: string, tenantId: string | null, codeHash: string): Promise<boolean>;
  createPasswordReset(userId: string, tokenHash: string, expiresAt: Date): Promise<void>;
  consumePasswordReset(tokenHash: string, newPasswordHash: string): Promise<boolean>;
  enqueueAuthMessage(tenantId: string | null, channel: "SMS" | "EMAIL", recipient: string, template: string, payload: Record<string, unknown>): Promise<void>;
  audit(eventType: string, actorUserId: string | null, tenantId: string | null, metadata: Record<string, unknown>): Promise<void>;
}
