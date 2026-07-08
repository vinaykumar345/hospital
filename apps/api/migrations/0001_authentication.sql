create extension if not exists pgcrypto;

create table if not exists user_credentials (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid null,
  email text null,
  email_lower text null,
  mobile_e164 text null,
  password_hash text null,
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'INVITED', 'LOCKED', 'DISABLED')),
  mfa_enabled boolean not null default false,
  mfa_secret_encrypted text null,
  failed_login_attempts integer not null default 0,
  locked_until timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_credentials_contact_required check (email is not null or mobile_e164 is not null)
);

create unique index if not exists user_credentials_email_tenant_uidx
  on user_credentials (tenant_id, email_lower)
  where email_lower is not null;

create unique index if not exists user_credentials_mobile_tenant_uidx
  on user_credentials (tenant_id, mobile_e164)
  where mobile_e164 is not null;

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid null,
  name text not null,
  description text null,
  created_at timestamptz not null default now(),
  unique (tenant_id, name)
);

create table if not exists user_role_assignments (
  user_id uuid not null references user_credentials(id) on delete cascade,
  role_id uuid not null references roles(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  primary key (user_id, role_id)
);

create table if not exists auth_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references user_credentials(id) on delete cascade,
  tenant_id uuid null,
  refresh_token_hash text not null unique,
  user_agent text null,
  ip_address inet null,
  expires_at timestamptz not null,
  rotated_at timestamptz null,
  revoked_at timestamptz null,
  created_at timestamptz not null default now()
);

create index if not exists auth_sessions_user_idx on auth_sessions (user_id, revoked_at, expires_at);

create table if not exists auth_otps (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid null,
  mobile_e164 text not null,
  purpose text not null check (purpose in ('LOGIN', 'MFA')),
  code_hash text not null,
  expires_at timestamptz not null,
  consumed_at timestamptz null,
  created_at timestamptz not null default now()
);

create index if not exists auth_otps_lookup_idx on auth_otps (tenant_id, mobile_e164, purpose, expires_at);

create table if not exists password_reset_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references user_credentials(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  consumed_at timestamptz null,
  created_at timestamptz not null default now()
);

create table if not exists auth_delivery_outbox (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid null,
  channel text not null check (channel in ('SMS', 'EMAIL')),
  recipient text not null,
  template text not null,
  payload jsonb not null,
  status text not null default 'PENDING' check (status in ('PENDING', 'SENT', 'FAILED')),
  attempts integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  sent_at timestamptz null
);

create index if not exists auth_delivery_outbox_status_idx
  on auth_delivery_outbox (status, next_attempt_at);

create table if not exists audit_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid null,
  actor_user_id uuid null references user_credentials(id) on delete set null,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_events_tenant_created_idx on audit_events (tenant_id, created_at desc);

insert into roles (tenant_id, name, description)
values
  (null, 'SUPER_ADMIN', 'Platform-wide administrator'),
  (null, 'HOSPITAL_ADMIN', 'Hospital tenant administrator'),
  (null, 'DOCTOR', 'Licensed clinician'),
  (null, 'RECEPTIONIST', 'Front desk and queue operator'),
  (null, 'NURSE', 'Nursing staff'),
  (null, 'LAB_TECHNICIAN', 'Laboratory staff'),
  (null, 'PHARMACIST', 'Pharmacy staff'),
  (null, 'BILLING_STAFF', 'Billing and payments staff'),
  (null, 'PATIENT', 'Patient portal user'),
  (null, 'INSURANCE_COORDINATOR', 'Insurance workflow staff')
on conflict (tenant_id, name) do nothing;
