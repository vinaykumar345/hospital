# Module 2: Authentication

## Understand

Authentication supports email/password, mobile OTP, MFA challenge flow, JWT access tokens, rotating refresh tokens, session revocation, password reset, audit logging, and tenant-ready identity records.

## Roles

All roles authenticate through this module. Role enforcement is expanded in the RBAC module.

## Database

Tables: `user_credentials`, `roles`, `user_role_assignments`, `auth_sessions`, `auth_otps`, `password_reset_tokens`, `auth_delivery_outbox`, and `audit_events`.

## APIs

Routes are exposed under `/api/v1/auth`.

## Security Rules

- Passwords are never stored in plain text.
- Refresh, OTP, and reset tokens are stored as HMAC hashes.
- OTP and password reset secrets are queued to the delivery outbox and are never returned in API responses.
- Failed login attempts lock accounts temporarily.
- Mutating auth events are audit logged.
- DTO validation rejects unknown or malformed request fields.
- Tenant ID is carried through auth records for module 3 isolation enforcement.

## Tests

Run `npm run test` from the repository root.
