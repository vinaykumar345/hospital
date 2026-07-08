# Module 14: Billing Module

## Understand

The billing module supports consultation, procedure, laboratory, pharmacy, and package billing; discounts; GST; invoice generation; and payment records.

## Roles

Billing Staff, Hospital Admin, Receptionist, and Patient consume billing workflows according to permissions.

## Database

Tables: `invoices`, `invoice_lines`, and `invoice_payments`.

## APIs

Routes are exposed under `/api/v1/billing`.

## Security Rules

- Requires `BILLING_MANAGE`.
- Billing records are tenant-owned and protected by row-level security.
- Payment gateway references are stored without card secrets.

## Tests

Run `npm run test` from the repository root.
