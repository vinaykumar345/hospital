create table if not exists permissions (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text null,
  created_at timestamptz not null default now()
);

create table if not exists role_permissions (
  role_id uuid not null references roles(id) on delete cascade,
  permission_id uuid not null references permissions(id) on delete cascade,
  granted_at timestamptz not null default now(),
  primary key (role_id, permission_id)
);

insert into permissions (name, description)
values
  ('TENANT_MANAGE', 'Create and administer SaaS tenants'),
  ('USER_MANAGE', 'Invite, update, and deactivate users'),
  ('ROLE_MANAGE', 'Manage roles and permission assignments'),
  ('HOSPITAL_PROFILE_MANAGE', 'Manage hospital profile and setup'),
  ('PATIENT_READ', 'View patient records'),
  ('PATIENT_WRITE', 'Create and update patient records'),
  ('APPOINTMENT_READ', 'View appointments and queues'),
  ('APPOINTMENT_WRITE', 'Create and update appointments and queues'),
  ('CLINICAL_NOTE_READ', 'View clinical documentation'),
  ('CLINICAL_NOTE_WRITE', 'Create and update clinical documentation'),
  ('LAB_ORDER_MANAGE', 'Manage laboratory orders and results'),
  ('PHARMACY_MANAGE', 'Manage pharmacy inventory and dispensing'),
  ('BILLING_MANAGE', 'Manage invoices, payments, and discounts'),
  ('INSURANCE_MANAGE', 'Manage insurance verification and claims'),
  ('AI_AGENT_USE', 'Use AI assistant features with human review'),
  ('AUDIT_READ', 'View audit logs')
on conflict (name) do update set description = excluded.description;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
join permissions p on
  (r.name = 'SUPER_ADMIN') or
  (r.name = 'HOSPITAL_ADMIN' and p.name in ('USER_MANAGE', 'ROLE_MANAGE', 'HOSPITAL_PROFILE_MANAGE', 'PATIENT_READ', 'APPOINTMENT_READ', 'BILLING_MANAGE', 'AUDIT_READ')) or
  (r.name = 'DOCTOR' and p.name in ('PATIENT_READ', 'CLINICAL_NOTE_READ', 'CLINICAL_NOTE_WRITE', 'APPOINTMENT_READ', 'AI_AGENT_USE')) or
  (r.name = 'RECEPTIONIST' and p.name in ('PATIENT_READ', 'PATIENT_WRITE', 'APPOINTMENT_READ', 'APPOINTMENT_WRITE', 'AI_AGENT_USE')) or
  (r.name = 'NURSE' and p.name in ('PATIENT_READ', 'CLINICAL_NOTE_READ', 'CLINICAL_NOTE_WRITE', 'AI_AGENT_USE')) or
  (r.name = 'LAB_TECHNICIAN' and p.name in ('PATIENT_READ', 'LAB_ORDER_MANAGE', 'AI_AGENT_USE')) or
  (r.name = 'PHARMACIST' and p.name in ('PATIENT_READ', 'PHARMACY_MANAGE')) or
  (r.name = 'BILLING_STAFF' and p.name in ('PATIENT_READ', 'BILLING_MANAGE')) or
  (r.name = 'PATIENT' and p.name in ('PATIENT_READ', 'APPOINTMENT_READ', 'APPOINTMENT_WRITE', 'AI_AGENT_USE')) or
  (r.name = 'INSURANCE_COORDINATOR' and p.name in ('PATIENT_READ', 'INSURANCE_MANAGE'))
on conflict do nothing;

create index if not exists role_permissions_permission_idx on role_permissions (permission_id);
