# Module 15: Insurance Module

## Understand

The insurance module supports insurance verification, claim preparation, secure document metadata, and claim status tracking.

## Roles

Insurance Coordinator, Billing Staff, and Hospital Admin use insurance workflows according to permissions.

## Database

Tables: `insurance_policies`, `insurance_claims`, and `insurance_claim_documents`.

## APIs

Routes are exposed under `/api/v1/insurance`.

## Security Rules

- Requires `INSURANCE_MANAGE`.
- Insurance records are tenant-owned and protected by row-level security.
- Uploaded documents are referenced by S3 key; production upload flows must use secure signed URLs.

## Tests

Run `npm run test` from the repository root.
