# Module 4: Role-Based Access Control

## Understand

RBAC defines the permission model for all platform roles and exposes reusable backend guards for protected APIs.

## Roles

Super Admin, Hospital Admin, Doctor, Receptionist, Nurse, Lab Technician, Pharmacist, Billing Staff, Patient, and Insurance Coordinator.

## Database

Tables: `permissions` and `role_permissions`, extending the `roles` and `user_role_assignments` tables from authentication.

## APIs

Routes are exposed under `/api/v1/rbac` for listing, granting, and revoking role permissions.

## Security Rules

- Protected handlers use `@RequirePermissions`.
- The `RbacGuard` denies unauthenticated users and users missing required permissions.
- Permission names are shared between backend and frontend through `@hospital/shared`.
- Super Admin receives every permission by default.

## Tests

Run `npm run test` from the repository root.
