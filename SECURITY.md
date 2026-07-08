# Security Policy

## Medical Safety

AI-generated content is assistive only and must be reviewed before use. The platform must never claim to replace licensed medical judgment.

## Reporting

Report suspected vulnerabilities to the platform security owner configured by the deploying organization. Do not include patient data in reports unless explicitly required and handled through an approved secure channel.

## Baseline Controls

- Tenant isolation with tenant-owned records and row-level security policies.
- Role-based access control.
- Audit logging for sensitive events.
- Validation on API DTOs.
- Secrets stored outside source control.
- TLS required in production.
- Encrypted database and object storage required in production.
- Backups and restore drills required for production tenants.
