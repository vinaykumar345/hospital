# Module 10: Doctor Dashboard

## Understand

The doctor dashboard shows today's appointments, pending documentation, follow-ups, and patient summary task signals.

## Roles

Doctor and Hospital Admin use this dashboard according to clinical permissions.

## Database

Table: `doctor_dashboard_tasks`.

## APIs

Route: `GET /api/v1/dashboards/doctor`.

## Security Rules

- Requires `CLINICAL_NOTE_READ`.
- Dashboard data is tenant-owned and scoped by doctor user ID.
- AI summaries are not generated in this module; later AI modules must show the required review disclaimer.

## Tests

Run `npm run test` from the repository root.
