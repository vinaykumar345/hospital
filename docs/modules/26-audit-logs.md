# Module 26: Audit Logs

## Understand

Audit logs provide tenant-scoped visibility into security-sensitive and workflow events.

## Roles

Hospital Admin and Super Admin use audit logs through `AUDIT_READ`.

## Database

Table: `audit_events`.

## APIs

Route: `GET /api/v1/audit/events`.

## Security Rules

- Requires `AUDIT_READ`.
- Audit events are tenant-scoped.
- Events include request, actor, entity, IP address, user agent, metadata, and timestamp fields.

## Tests

Run `npm run test` from the repository root.
