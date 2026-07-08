# Production Hardening

## Required Before Production

- Configure production secrets in a secret manager.
- Enable TLS at ingress.
- Configure PostgreSQL encryption at rest and backups.
- Configure S3 bucket encryption, private ACLs, and lifecycle rules.
- Configure Redis authentication and network isolation.
- Configure Elasticsearch authentication and network isolation.
- Configure provider credentials for email, SMS, push, WhatsApp, payment gateway, and telephony outside source control.
- Run database migrations in order.
- Run `npm run test`.
- Review RBAC role-permission assignments.
- Review audit log retention.
- Review AI safety wording in every AI workflow.
- Confirm PHI is not written to application logs.
- Confirm monitoring alerts for API latency, error rate, storage, queue failures, and failed jobs.

## AI Safety

Every AI output must include:

`AI-generated content. Please review before use.`

AI outputs must be draft/support content only and must not be presented as final diagnosis, treatment, or medical advice.

## Backup And Restore

- Daily encrypted PostgreSQL backups.
- Point-in-time recovery where supported.
- S3 versioning for uploaded clinical and insurance documents.
- Quarterly restore drills.
- Document RPO/RTO per tenant contract.

## Privacy

- Minimum necessary PHI in logs.
- Tenant-scoped access checks.
- Audit sensitive workflow actions.
- Use signed URLs for file upload/download.
- Review data retention and deletion requirements per jurisdiction.
