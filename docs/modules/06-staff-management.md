# Module 6: Staff Management

## Understand

Staff management links authenticated users to hospital employment profiles, roles, branches, departments, and doctor schedules.

## Roles

Hospital Admin manages staff. Super Admin can assist tenant setup. Doctors, nurses, and operational staff consume profile and schedule data in later dashboards.

## Database

Tables: `staff_profiles`; doctor schedule persistence uses `doctor_schedules` from hospital management.

## APIs

Routes are exposed under `/api/v1/staff`.

## Security Rules

- API handlers require `USER_MANAGE`.
- Staff profiles are tenant-owned and protected by row-level security.
- Staff status supports active, leave, suspension, and offboarding.
- Doctor schedule inputs validate weekday and slot length.

## Tests

Run `npm run test` from the repository root.
