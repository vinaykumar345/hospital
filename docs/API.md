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

## RBAC

- `GET /api/v1/rbac/role-permissions`
- `POST /api/v1/rbac/role-permissions`
- `DELETE /api/v1/rbac/role-permissions`

RBAC endpoints require `ROLE_MANAGE`.

## Hospital Management

- `GET /api/v1/hospital/profile`
- `POST /api/v1/hospital/profile`
- `GET /api/v1/hospital/departments`
- `POST /api/v1/hospital/departments`
- `GET /api/v1/hospital/branches`
- `POST /api/v1/hospital/branches`
- `GET /api/v1/hospital/rooms`
- `POST /api/v1/hospital/rooms`
- `GET /api/v1/hospital/beds`
- `POST /api/v1/hospital/beds`
- `PATCH /api/v1/hospital/beds/{bedId}/status`

Hospital management endpoints require `HOSPITAL_PROFILE_MANAGE`.

## Staff Management

- `GET /api/v1/staff`
- `POST /api/v1/staff`
- `PATCH /api/v1/staff/{staffId}/status`
- `GET /api/v1/staff/doctor-schedules`
- `POST /api/v1/staff/doctor-schedules`

Staff management endpoints require `USER_MANAGE`.

## Patient Management

- `GET /api/v1/patients`
- `POST /api/v1/patients`
- `GET /api/v1/patients/{patientId}`
- `POST /api/v1/patients/{patientId}/allergies`
- `POST /api/v1/patients/{patientId}/medications`
- `POST /api/v1/patients/{patientId}/emergency-contacts`
- `POST /api/v1/patients/{patientId}/insurance`
- `POST /api/v1/patients/{patientId}/consents`
- `POST /api/v1/patients/{patientId}/visits`

Patient read endpoints require `PATIENT_READ`; write endpoints require `PATIENT_WRITE`.

## Appointment System

- `GET /api/v1/appointments`
- `POST /api/v1/appointments`
- `PATCH /api/v1/appointments/{appointmentId}/status`
- `POST /api/v1/appointments/{appointmentId}/queue`
- `PATCH /api/v1/appointments/{appointmentId}/queue`

Appointment read endpoints require `APPOINTMENT_READ`; write and queue endpoints require `APPOINTMENT_WRITE`.

## Reception Dashboard

- `GET /api/v1/dashboards/reception`

Reception dashboard requires `APPOINTMENT_READ` and returns queue, walk-in, checked-in, cancellation, and upcoming appointment metrics.
