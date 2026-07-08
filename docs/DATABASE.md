# Database Schema

This document is updated module by module.

## Conventions

- PostgreSQL is the system of record.
- Tenant-owned tables include `tenant_id uuid not null`.
- Primary keys use UUIDs.
- Tables include `created_at`, `updated_at`, and where appropriate `deleted_at`.
- Clinical and financial events are audit logged.
- PHI-bearing tables must be encrypted at rest by infrastructure and protected through RBAC and tenant policies.

## Initial Project Tables

Project setup does not create application tables yet. Authentication and tenancy migrations are added in modules 2 and 3.

## Authentication Tables

Defined in `apps/api/migrations/0001_authentication.sql`.

- `user_credentials` stores tenant-aware email, mobile, password hash, MFA, lockout, and status fields.
- `roles` and `user_role_assignments` provide the initial role model expanded in the RBAC module.
- `auth_sessions` stores rotating refresh token hashes and session lifecycle metadata.
- `auth_otps` stores hashed one-time mobile login codes with expiry and consumption state.
- `password_reset_tokens` stores hashed reset tokens with expiry and consumption state.
- `auth_delivery_outbox` queues OTP and password reset messages for the notification delivery worker.
- `audit_events` records authentication events and later expands into platform-wide audit logging.
