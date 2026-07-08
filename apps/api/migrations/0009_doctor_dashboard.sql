create table if not exists doctor_dashboard_tasks (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  doctor_user_id uuid not null references user_credentials(id) on delete cascade,
  patient_id uuid references patients(id) on delete cascade,
  appointment_id uuid references appointments(id) on delete cascade,
  task_type text not null check (task_type in ('PENDING_DOCUMENTATION', 'FOLLOW_UP', 'PATIENT_SUMMARY')),
  label text not null,
  status text not null default 'OPEN' check (status in ('OPEN', 'DONE', 'DISMISSED')),
  due_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists doctor_dashboard_tasks_lookup_idx
  on doctor_dashboard_tasks (tenant_id, doctor_user_id, status, task_type, due_at);

alter table doctor_dashboard_tasks enable row level security;

drop policy if exists doctor_dashboard_tasks_tenant_isolation on doctor_dashboard_tasks;
create policy doctor_dashboard_tasks_tenant_isolation on doctor_dashboard_tasks
  using (tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id::text = current_setting('app.tenant_id', true));
