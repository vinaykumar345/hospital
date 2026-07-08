# Database Schema

This document is updated module by module.

## Conventions

- PostgreSQL is the system of record.
- Tenant-owned tables include `tenant_id uuid not null`.
- Primary keys use UUIDs.
- Tables include `created_at`, `updated_at`, and where appropriate `deleted_at`.
- Clinical and financial events are audit logged.
- PHI-bearing tables must be encrypted at rest by infrastructure and protected through RBAC and tenant policies.

## Initial Project Tables

Project setup does not create application tables yet. Authentication and tenancy migrations are added in modules 2 and 3.
