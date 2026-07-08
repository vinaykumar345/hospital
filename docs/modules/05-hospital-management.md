# Module 5: Hospital Management

## Understand

Hospital management covers hospital profile, departments, branches, rooms, beds, and doctor schedule storage.

## Roles

Hospital Admin manages this module. Super Admin can manage tenants and assist with setup.

## Database

Tables: `hospital_profiles`, `departments`, `branches`, `rooms`, `beds`, and `doctor_schedules`.

## APIs

Routes are exposed under `/api/v1/hospital`.

## Security Rules

- API handlers require `HOSPITAL_PROFILE_MANAGE`.
- Tenant-owned tables include `tenant_id`.
- Row-level security is enabled for hospital-owned tables.
- Room and bed status values are constrained by database checks and DTO validation.

## Tests

Run `npm run test` from the repository root.
