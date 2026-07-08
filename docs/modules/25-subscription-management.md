# Module 25: Subscription Management

## Understand

Subscription management tracks SaaS plans, tenant subscriptions, billing interval, subscription status, and provider invoice references.

## Roles

Super Admin manages subscription plans and tenant subscriptions.

## Database

Tables: `subscription_plans`, `tenant_subscriptions`, and `subscription_invoices`.

## APIs

Routes are exposed under `/api/v1/subscriptions`.

## Security Rules

- Requires `TENANT_MANAGE`.
- Tenant subscription records are tenant-owned and protected by row-level security.
- Payment provider secrets must not be stored in these tables.

## Tests

Run `npm run test` from the repository root.
