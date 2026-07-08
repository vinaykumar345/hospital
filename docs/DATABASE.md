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

## Authentication Tables

Defined in `apps/api/migrations/0001_authentication.sql`.

- `user_credentials` stores tenant-aware email, mobile, password hash, MFA, lockout, and status fields.
- `roles` and `user_role_assignments` provide the initial role model expanded in the RBAC module.
- `auth_sessions` stores rotating refresh token hashes and session lifecycle metadata.
- `auth_otps` stores hashed one-time mobile login codes with expiry and consumption state.
- `password_reset_tokens` stores hashed reset tokens with expiry and consumption state.
- `auth_delivery_outbox` queues OTP and password reset messages for the notification delivery worker.
- `audit_events` records authentication events and later expands into platform-wide audit logging.

## Multi-Tenant Hospital Setup Tables

Defined in `apps/api/migrations/0002_multi_tenant_hospital_setup.sql`.

- `tenants` stores the SaaS tenant record.
- `tenant_domains` maps custom domains to tenants.
- `tenant_branding` stores logo, color, mobile app, and email branding defaults.
- `hospital_profiles` stores legal and contact profile details for each hospital tenant.

Tenant-owned authentication tables have row-level security enabled and use `current_setting('app.tenant_id', true)` for isolation.

## RBAC Tables

Defined in `apps/api/migrations/0003_role_based_access_control.sql`.

- `permissions` stores canonical platform permissions.
- `role_permissions` maps roles to permissions.

## Hospital Management Tables

Defined in `apps/api/migrations/0004_hospital_management.sql`.

- `departments` stores tenant departments.
- `branches` stores hospital locations.
- `rooms` stores consultation, ward, ICU, lab, pharmacy, and procedure rooms.
- `beds` stores bed labels and occupancy status.
- `doctor_schedules` stores weekly doctor availability by branch and department.

## Staff Management Tables

Defined in `apps/api/migrations/0005_staff_management.sql`.

- `staff_profiles` stores employment profile, role, status, department, branch, and license metadata linked to authenticated users.

## Patient Management Tables

Defined in `apps/api/migrations/0006_patient_management.sql`.

- `patients` stores digital registration and patient profile fields.
- `patient_allergies`, `patient_medications`, `patient_emergency_contacts`, `patient_insurance_details`, `patient_consents`, and `patient_visits` store patient subrecords.

## Appointment System Tables

Defined in `apps/api/migrations/0007_appointment_system.sql`.

- `appointments` stores online, walk-in, and teleconsultation appointments.
- `appointment_queue` stores queue numbers, queue status, and estimated wait metadata.
- `appointment_reminders` stores reminder jobs for the notification module.

## Reception Dashboard Views

Defined in `apps/api/migrations/0008_reception_dashboard.sql`.

- `reception_dashboard_queue_summary` summarizes walk-ins and queue states by tenant and service date.

## Doctor Dashboard Tables

Defined in `apps/api/migrations/0009_doctor_dashboard.sql`.

- `doctor_dashboard_tasks` stores pending documentation, follow-up, and patient summary tasks.

## Nurse Dashboard Tables

Defined in `apps/api/migrations/0010_nurse_dashboard.sql`.

- `nurse_dashboard_tasks` stores shift handover, medication schedule, nursing task, vital signs, and observation log tasks.

## Laboratory Tables

Defined in `apps/api/migrations/0011_laboratory_module.sql`.

- `lab_tests` stores the test catalog.
- `lab_orders` stores ordered tests.
- `lab_samples` tracks sample collection and movement.
- `lab_results` stores result entry and interpretation.
- `lab_critical_alerts` stores critical value alerts.
- `lab_result_summary_requests` stores plain-language AI summary requests with the required review disclaimer.

## Pharmacy Tables

Defined in `apps/api/migrations/0012_pharmacy_module.sql`.

- `medicines` stores the catalog.
- `pharmacy_stock_lots` stores inventory batches and expiry dates.
- `prescriptions` and `prescription_items` store prescribed medicines.
- `pharmacy_dispenses` stores dispensing events.
- `pharmacy_interaction_warnings` stores pharmacist-reviewed drug interaction warnings.
- `pharmacy_expiry_alerts` stores stock expiry alerts.

## Billing Tables

Defined in `apps/api/migrations/0013_billing_module.sql`.

- `invoices` stores invoice totals, GST, discounts, status, and paid amount.
- `invoice_lines` stores consultation, procedure, lab, pharmacy, and package line items.
- `invoice_payments` stores cash, card, UPI, bank transfer, and payment gateway payments.

## Insurance Tables

Defined in `apps/api/migrations/0014_insurance_module.sql`.

- `insurance_policies` stores insurance verification information.
- `insurance_claims` stores claim preparation and status tracking.
- `insurance_claim_documents` stores uploaded document metadata and S3 keys.

## Notification Tables

Defined in `apps/api/migrations/0015_notification_system.sql`.

- `notification_templates` stores tenant-specific email, SMS, push, and WhatsApp templates.
- `notification_deliveries` stores provider-neutral delivery queue records.
- `notification_preferences` stores user channel preferences.

## AI Reception Agent Tables

Defined in `apps/api/migrations/0016_ai_reception_agent.sql`.

- `ai_agent_interactions` stores reception agent messages, responses, disclaimers, and review metadata.
- `reception_agent_actions` stores action drafts for appointment booking, department routing, queue updates, and FAQs.

## AI Doctor Agent Tables

Defined in `apps/api/migrations/0017_ai_doctor_agent.sql`.

- `doctor_agent_outputs` stores review-gated doctor assistant drafts for summaries, notes, differential suggestions, medication interaction highlights, referrals, discharge summaries, and follow-up plans.
