# Module 9: Reception Dashboard

## Understand

The reception dashboard gives front desk users a concise view of queue status, walk-ins, upcoming appointments, check-ins, and cancellations.

## Roles

Receptionist and Hospital Admin use this dashboard.

## Database

View: `reception_dashboard_queue_summary`.

## APIs

Route: `GET /api/v1/dashboards/reception`.

## Security Rules

- Requires `APPOINTMENT_READ`.
- Aggregates tenant-owned appointment and queue records.

## Tests

Run `npm run test` from the repository root.
