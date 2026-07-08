# Administrator Manual

This manual is expanded as modules are completed.

Initial setup includes configuring tenant branding, domains, departments, staff users, subscriptions, and security policies.

## Authentication Administration

Administrators should enforce strong passwords, enable MFA for staff accounts, review audit events, and revoke stale sessions when staff leave the organization.

## Tenant Setup

Super Admins create a tenant for each hospital organization, map verified domains, configure branding, and confirm the hospital profile before users are invited.

## Role Management

Only users with `ROLE_MANAGE` can grant or revoke permissions. Review assignments after staff transfers, department changes, and offboarding.

## Hospital Management

Hospital Admins configure profile details, departments, branches, rooms, beds, and schedule foundations before staff and appointment workflows go live.

## Staff Management

Hospital Admins create staff profiles after user credentials exist, assign departments and branches, manage employment status, and maintain doctor schedules.

## Patient Management

Authorized staff can register patients and maintain subrecords for allergies, medications, contacts, insurance, consents, and visits. Access must follow hospital privacy policy.

## Appointment System

Admins and reception teams configure booking operations around doctor schedules, queues, reminders, and teleconsultation workflows.

## Reception Dashboard

Reception teams use the dashboard to monitor walk-ins, queue status, upcoming appointments, check-ins, and cancellations.

## Doctor Dashboard

Doctors use the dashboard to review today's appointments, documentation tasks, follow-ups, and patient summary tasks.

## Nurse Dashboard

Nursing teams use the dashboard to manage shift handovers, medication schedules, nursing tasks, vital signs, and observation logs.

## Laboratory

Lab teams maintain test catalogs, create orders, track samples, enter results, and monitor critical alerts. Plain-language summaries must be reviewed before patient use.

## Pharmacy

Pharmacy teams maintain medicines, stock lots, expiry alerts, prescriptions, interaction warnings, and dispense events.

## Billing

Billing teams generate invoices, add service lines, apply GST and discounts, and record payments without storing payment card secrets.

## Insurance

Insurance coordinators verify policies, prepare claims, attach secure document metadata, and track claim status.

## Patient Mobile App

Administrators should configure tenant branding, patient access policies, and notification settings before inviting patients to use the mobile app.

## Notifications

Administrators configure channel templates and user preferences. Provider credentials must be managed through deployment secrets.

## AI Reception Agent

Reception teams can use the AI agent for appointment drafts, queue estimates, FAQs, and department routing. Outputs must be reviewed before use.

## AI Doctor Agent

Doctors can create review-gated clinical drafts. Differential diagnosis suggestions and medication interaction highlights require licensed clinician review.

## AI Nurse Agent

Nurses can create review-gated handover, medication schedule, task, vital sign, and observation drafts.

## AI Patient Assistant

Patient-facing AI responses must remain educational or operational and must not provide final diagnosis or treatment instructions.

## AI Voice Follow-Up Agent

Administrators configure reviewed call campaigns and telephony provider settings. Calls must remain support workflows and avoid medical advice.

## Admin Analytics

Hospital Admins can review daily revenue, OPD/IPD statistics, bed occupancy, appointment trends, satisfaction metrics, and AI operational insights.

## White Label

Hospital Admins can configure logo assets, colors, mobile splash assets, email templates, and domain branding.

## Subscription Management

Super Admins manage SaaS plans, tenant subscription status, billing intervals, and provider billing references.

## Audit Logs

Administrators with audit access can review security events, actor activity, entity history, IP addresses, and request metadata.

## Monitoring And Logging

Operations teams should monitor API latency, request rate, errors, logs, and traces through Prometheus, Grafana, Loki, and OpenTelemetry.

## CI/CD

Engineering administrators should require successful CI checks before deployment and use protected release environments for production promotion.

## Docker And Kubernetes

Production operators should deploy signed container images, configure secrets through a secret manager, enable TLS ingress, and monitor HPA scaling behavior.

## Production Hardening

Before go-live, complete the production hardening checklist, validate backups, review AI safety labels, verify RBAC, and confirm audit/monitoring coverage.
