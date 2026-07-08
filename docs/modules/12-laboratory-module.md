# Module 12: Laboratory Module

## Understand

The laboratory module supports test ordering, sample tracking, result entry, plain-language summary request records, and critical value alerts.

## Roles

Lab Technician, Doctor, Nurse, and Patient consume laboratory workflows according to permissions.

## Database

Tables: `lab_tests`, `lab_orders`, `lab_samples`, `lab_results`, `lab_critical_alerts`, and `lab_result_summary_requests`.

## APIs

Routes are exposed under `/api/v1/laboratory`.

## Security Rules

- Requires `LAB_ORDER_MANAGE`.
- Lab records are tenant-owned and protected by row-level security.
- Critical results create alert records.
- AI summary records carry: "AI-generated content. Please review before use."

## Tests

Run `npm run test` from the repository root.
