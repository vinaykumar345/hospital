# Module 23: Admin Analytics Dashboard

## Understand

The admin analytics dashboard aggregates daily revenue, OPD/IPD statistics, doctor utilization foundations, bed occupancy, appointment trends, satisfaction placeholders, and AI-generated operational insights.

## Roles

Hospital Admin and Super Admin use this dashboard.

## Database

Table: `admin_operational_insights`.

## APIs

Route: `GET /api/v1/dashboards/admin-analytics`.

## Security Rules

- Requires `AUDIT_READ`.
- Analytics are tenant-scoped.
- AI-generated operational insights include: "AI-generated content. Please review before use."

## Tests

Run `npm run test` from the repository root.
