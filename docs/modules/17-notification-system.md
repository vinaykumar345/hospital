# Module 17: Notification System

## Understand

The notification system supports email, SMS, push notification, and optional WhatsApp templates, delivery queue records, provider message IDs, retry metadata, and user preferences.

## Roles

Hospital Admin configures templates and preferences. Patients and staff receive notifications according to workflow modules.

## Database

Tables: `notification_templates`, `notification_deliveries`, and `notification_preferences`.

## APIs

Routes are exposed under `/api/v1/notifications`.

## Security Rules

- Administration requires `HOSPITAL_PROFILE_MANAGE`.
- Notification records are tenant-owned and protected by row-level security.
- Provider secrets must be stored outside the database in secret management.

## Tests

Run `npm run test` from the repository root.
