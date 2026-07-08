import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import { AuthRepository, CreateCredentialInput, CreateSessionInput } from "./auth.repository.js";
import { AuthSession, CredentialRecord } from "./auth.types.js";

interface CredentialRow {
  id: string;
  tenant_id: string | null;
  email: string | null;
  mobile_e164: string | null;
  password_hash: string | null;
  status: CredentialRecord["status"];
  mfa_enabled: boolean;
  failed_login_attempts: number;
  locked_until: Date | null;
  roles: string[];
}

interface SessionRow {
  id: string;
  user_id: string;
  tenant_id: string | null;
  expires_at: Date;
}

@Injectable()
export class PostgresAuthRepository implements AuthRepository {
  constructor(private readonly postgres: PostgresService) {}

  async createCredential(input: CreateCredentialInput): Promise<CredentialRecord> {
    const result = await this.postgres.query<CredentialRow>(
      `insert into user_credentials (tenant_id, email, email_lower, mobile_e164, password_hash)
       values ($1, $2, lower($2), $3, $4)
       returning id, tenant_id, email, mobile_e164, password_hash, status, mfa_enabled,
         failed_login_attempts, locked_until, array[]::text[] as roles`,
      [input.tenantId, input.email, input.mobile, input.passwordHash]
    );

    return this.toCredential(result.rows[0]);
  }

  async findCredentialByEmail(email: string, tenantId: string | null): Promise<CredentialRecord | null> {
    const result = await this.postgres.query<CredentialRow>(
      `select uc.id, uc.tenant_id, uc.email, uc.mobile_e164, uc.password_hash, uc.status, uc.mfa_enabled,
        uc.failed_login_attempts, uc.locked_until, coalesce(array_agg(r.name) filter (where r.name is not null), array[]::text[]) as roles
       from user_credentials uc
       left join user_role_assignments ura on ura.user_id = uc.id
       left join roles r on r.id = ura.role_id
       where uc.email_lower = lower($1) and uc.tenant_id is not distinct from $2
       group by uc.id`,
      [email, tenantId]
    );

    return result.rows[0] ? this.toCredential(result.rows[0]) : null;
  }

  async findCredentialByMobile(mobile: string, tenantId: string | null): Promise<CredentialRecord | null> {
    const result = await this.postgres.query<CredentialRow>(
      `select uc.id, uc.tenant_id, uc.email, uc.mobile_e164, uc.password_hash, uc.status, uc.mfa_enabled,
        uc.failed_login_attempts, uc.locked_until, coalesce(array_agg(r.name) filter (where r.name is not null), array[]::text[]) as roles
       from user_credentials uc
       left join user_role_assignments ura on ura.user_id = uc.id
       left join roles r on r.id = ura.role_id
       where uc.mobile_e164 = $1 and uc.tenant_id is not distinct from $2
       group by uc.id`,
      [mobile, tenantId]
    );

    return result.rows[0] ? this.toCredential(result.rows[0]) : null;
  }

  async recordFailedLogin(userId: string, lockedUntil: Date | null) {
    await this.postgres.query(
      `update user_credentials
       set failed_login_attempts = failed_login_attempts + 1, locked_until = $2, updated_at = now()
       where id = $1`,
      [userId, lockedUntil]
    );
  }

  async clearFailedLogins(userId: string) {
    await this.postgres.query(
      `update user_credentials set failed_login_attempts = 0, locked_until = null, updated_at = now() where id = $1`,
      [userId]
    );
  }

  async createSession(input: CreateSessionInput): Promise<AuthSession> {
    const result = await this.postgres.query<SessionRow>(
      `insert into auth_sessions (user_id, tenant_id, refresh_token_hash, user_agent, ip_address, expires_at)
       values ($1, $2, $3, $4, $5, $6)
       returning id, user_id, tenant_id, expires_at`,
      [input.userId, input.tenantId, input.refreshTokenHash, input.userAgent ?? null, input.ipAddress ?? null, input.expiresAt]
    );

    return this.toSession(result.rows[0]);
  }

  async findSessionByRefreshTokenHash(refreshTokenHash: string): Promise<AuthSession | null> {
    const result = await this.postgres.query<SessionRow>(
      `select id, user_id, tenant_id, expires_at
       from auth_sessions
       where refresh_token_hash = $1 and revoked_at is null and expires_at > now()`,
      [refreshTokenHash]
    );

    return result.rows[0] ? this.toSession(result.rows[0]) : null;
  }

  async rotateRefreshToken(sessionId: string, refreshTokenHash: string, expiresAt: Date) {
    await this.postgres.query(
      `update auth_sessions
       set refresh_token_hash = $2, expires_at = $3, rotated_at = now()
       where id = $1 and revoked_at is null`,
      [sessionId, refreshTokenHash, expiresAt]
    );
  }

  async revokeSessionByRefreshTokenHash(refreshTokenHash: string) {
    await this.postgres.query(
      `update auth_sessions set revoked_at = now() where refresh_token_hash = $1 and revoked_at is null`,
      [refreshTokenHash]
    );
  }

  async createOtp(mobile: string, tenantId: string | null, codeHash: string, expiresAt: Date) {
    await this.postgres.query(
      `insert into auth_otps (tenant_id, mobile_e164, purpose, code_hash, expires_at)
       values ($1, $2, 'LOGIN', $3, $4)`,
      [tenantId, mobile, codeHash, expiresAt]
    );
  }

  async consumeOtp(mobile: string, tenantId: string | null, codeHash: string): Promise<boolean> {
    const result = await this.postgres.query(
      `update auth_otps
       set consumed_at = now()
       where id = (
         select id from auth_otps
         where mobile_e164 = $1 and tenant_id is not distinct from $2 and code_hash = $3
           and consumed_at is null and expires_at > now()
         order by created_at desc
         limit 1
       )`,
      [mobile, tenantId, codeHash]
    );

    return result.rowCount === 1;
  }

  async createPasswordReset(userId: string, tokenHash: string, expiresAt: Date) {
    await this.postgres.query(
      `insert into password_reset_tokens (user_id, token_hash, expires_at) values ($1, $2, $3)`,
      [userId, tokenHash, expiresAt]
    );
  }

  async consumePasswordReset(tokenHash: string, newPasswordHash: string): Promise<boolean> {
    const result = await this.postgres.query(
      `with consumed as (
         update password_reset_tokens
         set consumed_at = now()
         where token_hash = $1 and consumed_at is null and expires_at > now()
         returning user_id
       )
       update user_credentials
       set password_hash = $2, failed_login_attempts = 0, locked_until = null, updated_at = now()
       where id = (select user_id from consumed)`,
      [tokenHash, newPasswordHash]
    );

    return result.rowCount === 1;
  }

  async enqueueAuthMessage(
    tenantId: string | null,
    channel: "SMS" | "EMAIL",
    recipient: string,
    template: string,
    payload: Record<string, unknown>
  ) {
    await this.postgres.query(
      `insert into auth_delivery_outbox (tenant_id, channel, recipient, template, payload)
       values ($1, $2, $3, $4, $5::jsonb)`,
      [tenantId, channel, recipient, template, JSON.stringify(payload)]
    );
  }

  async audit(eventType: string, actorUserId: string | null, tenantId: string | null, metadata: Record<string, unknown>) {
    await this.postgres.query(
      `insert into audit_events (tenant_id, actor_user_id, event_type, metadata)
       values ($1, $2, $3, $4::jsonb)`,
      [tenantId, actorUserId, eventType, JSON.stringify(metadata)]
    );
  }

  private toCredential(row: CredentialRow): CredentialRecord {
    return {
      id: row.id,
      tenantId: row.tenant_id,
      email: row.email,
      mobile: row.mobile_e164,
      passwordHash: row.password_hash,
      status: row.status,
      failedLoginAttempts: row.failed_login_attempts,
      lockedUntil: row.locked_until,
      roles: row.roles,
      mfaEnabled: row.mfa_enabled
    };
  }

  private toSession(row: SessionRow): AuthSession {
    return {
      id: row.id,
      userId: row.user_id,
      tenantId: row.tenant_id,
      expiresAt: row.expires_at
    };
  }
}
