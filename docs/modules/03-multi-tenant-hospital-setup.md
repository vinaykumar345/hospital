# Module 3: Multi-Tenant Hospital Setup

## Understand

This module creates the SaaS tenant boundary for hospitals, clinics, diagnostic centers, and telemedicine providers.

## Roles

Super Admin creates and administers tenants. Hospital Admin manages branding and hospital profile after RBAC is enforced.

## Database

Tables: `tenants`, `tenant_domains`, `tenant_branding`, and `hospital_profiles`.

## APIs

Tenant creation, tenant lookup, domain resolution, and branding read/update are exposed under `/api/v1/tenants`.

## Security Rules

- Tenant-owned authentication records include `tenant_id`.
- Row-level security is enabled for tenant-owned auth tables.
- Domain values are normalized to lowercase.
- Branding inputs are validated before persistence.
- Tenant isolation uses `app.tenant_id` database session context.

## Tests

Run `npm run test` from the repository root.
