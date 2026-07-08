# Module 13: Pharmacy Module

## Understand

The pharmacy module supports prescription management, stock management, expiry alerts, drug interaction warnings, and dispensing workflow.

## Roles

Pharmacist, Doctor, Nurse, and Patient consume pharmacy workflows according to permissions.

## Database

Tables: `medicines`, `pharmacy_stock_lots`, `prescriptions`, `prescription_items`, `pharmacy_dispenses`, `pharmacy_interaction_warnings`, and `pharmacy_expiry_alerts`.

## APIs

Routes are exposed under `/api/v1/pharmacy`.

## Security Rules

- Requires `PHARMACY_MANAGE`.
- Pharmacy records are tenant-owned and protected by row-level security.
- Interaction warnings are review aids and must not override licensed clinical judgment.

## Tests

Run `npm run test` from the repository root.
