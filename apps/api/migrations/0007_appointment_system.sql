create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  doctor_user_id uuid not null references user_credentials(id) on delete cascade,
  branch_id uuid references branches(id) on delete set null,
  department_id uuid references departments(id) on delete set null,
  starts_at timestamptz not null,
  ends_at timestamptz null,
  source text not null check (source in ('ONLINE', 'WALK_IN', 'TELECONSULTATION')),
  status text not null default 'BOOKED' check (status in ('BOOKED', 'CHECKED_IN', 'IN_CONSULTATION', 'COMPLETED', 'CANCELLED', 'NO_SHOW')),
  reason text null,
  teleconsultation_url text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists appointment_queue (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  appointment_id uuid not null references appointments(id) on delete cascade,
  queue_number integer generated always as identity,
  queue_status text not null default 'WAITING' check (queue_status in ('WAITING', 'CALLED', 'IN_SERVICE', 'DONE', 'SKIPPED')),
  estimated_wait_minutes integer null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (appointment_id)
);

create table if not exists appointment_reminders (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  appointment_id uuid not null references appointments(id) on delete cascade,
  reminder_type text not null check (reminder_type in ('APPOINTMENT_CONFIRMATION', 'APPOINTMENT_REMINDER', 'FOLLOW_UP')),
  scheduled_for timestamptz not null,
  status text not null default 'PENDING' check (status in ('PENDING', 'SENT', 'FAILED', 'CANCELLED')),
  created_at timestamptz not null default now(),
  sent_at timestamptz null
);

create index if not exists appointments_calendar_idx on appointments (tenant_id, starts_at, doctor_user_id, status);
create index if not exists appointments_patient_idx on appointments (tenant_id, patient_id, starts_at desc);
create index if not exists appointment_queue_status_idx on appointment_queue (tenant_id, queue_status, created_at);
create index if not exists appointment_reminders_due_idx on appointment_reminders (status, scheduled_for);

alter table appointments enable row level security;
alter table appointment_queue enable row level security;
alter table appointment_reminders enable row level security;

drop policy if exists appointments_tenant_isolation on appointments;
create policy appointments_tenant_isolation on appointments using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists appointment_queue_tenant_isolation on appointment_queue;
create policy appointment_queue_tenant_isolation on appointment_queue using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists appointment_reminders_tenant_isolation on appointment_reminders;
create policy appointment_reminders_tenant_isolation on appointment_reminders using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
