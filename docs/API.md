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

## Doctor Dashboard

- `GET /api/v1/dashboards/doctor`

Doctor dashboard requires `CLINICAL_NOTE_READ` and returns today's appointments, open task counts, and follow-up items.

## Nurse Dashboard

- `GET /api/v1/dashboards/nurse`

Nurse dashboard requires `CLINICAL_NOTE_READ` and returns shift handover, medication, task, vital sign, and observation-log task summaries.

## Laboratory

- `GET /api/v1/laboratory/tests`
- `POST /api/v1/laboratory/tests`
- `GET /api/v1/laboratory/orders`
- `POST /api/v1/laboratory/orders`
- `PATCH /api/v1/laboratory/samples/{sampleId}/status`
- `POST /api/v1/laboratory/orders/{orderId}/results`

Laboratory endpoints require `LAB_ORDER_MANAGE`.

## Pharmacy

- `GET /api/v1/pharmacy/medicines`
- `POST /api/v1/pharmacy/medicines`
- `GET /api/v1/pharmacy/stock`
- `POST /api/v1/pharmacy/stock`
- `POST /api/v1/pharmacy/prescriptions`
- `POST /api/v1/pharmacy/prescriptions/{prescriptionId}/items`
- `POST /api/v1/pharmacy/dispenses`
- `POST /api/v1/pharmacy/interaction-warnings`

Pharmacy endpoints require `PHARMACY_MANAGE`.

## Billing

- `GET /api/v1/billing/invoices`
- `POST /api/v1/billing/invoices`
- `POST /api/v1/billing/invoices/{invoiceId}/lines`
- `POST /api/v1/billing/invoices/{invoiceId}/payments`

Billing endpoints require `BILLING_MANAGE`.

## Insurance

- `GET /api/v1/insurance/policies`
- `POST /api/v1/insurance/policies`
- `PATCH /api/v1/insurance/policies/{policyId}/verification`
- `GET /api/v1/insurance/claims`
- `POST /api/v1/insurance/claims`
- `POST /api/v1/insurance/claims/{claimId}/documents`
- `PATCH /api/v1/insurance/claims/{claimId}/status`

Insurance endpoints require `INSURANCE_MANAGE`.

## Notifications

- `GET /api/v1/notifications/templates`
- `POST /api/v1/notifications/templates`
- `GET /api/v1/notifications/deliveries`
- `POST /api/v1/notifications/deliveries`
- `POST /api/v1/notifications/preferences`

Notification administration requires `HOSPITAL_PROFILE_MANAGE`.

## AI Reception Agent

- `POST /api/v1/ai-agents/reception/respond`
- `POST /api/v1/ai-agents/reception/actions`

AI agent endpoints require `AI_AGENT_USE`. Responses include the required AI review disclaimer.

## AI Doctor Agent

- `POST /api/v1/ai-agents/doctor/draft`

Doctor agent drafts require `AI_AGENT_USE`. Drafts are review-only and must not be treated as final medical advice.

## AI Nurse Agent

- `POST /api/v1/ai-agents/nurse/draft`

Nurse agent drafts require `AI_AGENT_USE` and must be reviewed before use.
