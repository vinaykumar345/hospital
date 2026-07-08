export type AuthTokenPurpose = "access" | "refresh" | "password_reset" | "mobile_otp" | "mfa";

export interface AuthenticatedUser {
  id: string;
  tenantId: string | null;
  email: string | null;
  mobile: string | null;
  roles: string[];
  permissions: string[];
  mfaEnabled: boolean;
}

export interface CredentialRecord extends AuthenticatedUser {
  passwordHash: string | null;
  status: "ACTIVE" | "INVITED" | "LOCKED" | "DISABLED";
  failedLoginAttempts: number;
  lockedUntil: Date | null;
}

export interface AuthSession {
  id: string;
  userId: string;
  tenantId: string | null;
  expiresAt: Date;
}

export interface LoginResult {
  user: AuthenticatedUser;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  requiresMfa: boolean;
}
