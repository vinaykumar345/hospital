# Module 24: White-Label System

## Understand

The white-label system lets customers customize logo, theme, colors, mobile branding assets, email templates, and domains.

## Roles

Hospital Admin and Super Admin manage white-label configuration.

## Database

Tables: `white_label_theme_extensions`, `white_label_assets`, and `white_label_email_templates`.

## APIs

Routes are exposed under `/api/v1/white-label`.

## Security Rules

- Requires `HOSPITAL_PROFILE_MANAGE`.
- Asset records store S3 keys, not raw file contents.
- White-label records are tenant-owned and protected by row-level security.

## Tests

Run `npm run test` from the repository root.
