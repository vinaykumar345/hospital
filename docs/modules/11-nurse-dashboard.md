# Module 11: Nurse Dashboard

## Understand

The nurse dashboard shows shift handover, medication schedule, nursing task, vital sign, and observation-log work queues.

## Roles

Nurse and Hospital Admin use this dashboard according to clinical permissions.

## Database

Table: `nurse_dashboard_tasks`.

## APIs

Route: `GET /api/v1/dashboards/nurse`.

## Security Rules

- Requires `CLINICAL_NOTE_READ`.
- Dashboard data is tenant-owned and optionally scoped by nurse user ID.

## Tests

Run `npm run test` from the repository root.
