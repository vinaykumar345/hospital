# API Specification

REST APIs are versioned under `/api/v1`.

## Standards

- JSON request and response bodies.
- JWT bearer authentication unless explicitly public.
- Pagination uses `page`, `pageSize`, and `total`.
- Filtering uses explicit query parameters.
- All mutating requests are audit logged.
- OpenAPI documentation is exposed by the API service in non-production environments and published in CI artifacts.

## Health

`GET /api/v1/health`

Returns service status and build metadata.

## Authentication

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/mobile/request-otp`
- `POST /api/v1/auth/mobile/verify-otp`
- `POST /api/v1/auth/password/forgot`
- `POST /api/v1/auth/password/reset`

Authentication responses include short-lived access tokens and rotating refresh tokens. Mobile OTP and password reset delivery are queued through the notification provider once the notification module is enabled.

## Tenancy

- `POST /api/v1/tenants`
- `GET /api/v1/tenants/{tenantId}`
- `GET /api/v1/tenants/domain/{domain}`
- `GET /api/v1/tenants/{tenantId}/branding`
- `PATCH /api/v1/tenants/{tenantId}/branding`

Tenant APIs manage hospital SaaS tenants, domain mapping, and white-label branding foundations.
