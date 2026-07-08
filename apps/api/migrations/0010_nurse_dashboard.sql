create table if not exists nurse_dashboard_tasks (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  nurse_user_id uuid references user_credentials(id) on delete set null,
  patient_id uuid references patients(id) on delete cascade,
  task_type text not null check (task_type in ('SHIFT_HANDOVER', 'MEDICATION_SCHEDULE', 'NURSING_TASK', 'VITAL_SIGNS', 'OBSERVATION_LOG')),
  label text not null,
  status text not null default 'OPEN' check (status in ('OPEN', 'DONE', 'DISMISSED')),
  due_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists nurse_dashboard_tasks_lookup_idx
  on nurse_dashboard_tasks (tenant_id, nurse_user_id, status, task_type, due_at);

alter table nurse_dashboard_tasks enable row level security;

drop policy if exists nurse_dashboard_tasks_tenant_isolation on nurse_dashboard_tasks;
create policy nurse_dashboard_tasks_tenant_isolation on nurse_dashboard_tasks
  using (tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id::text = current_setting('app.tenant_id', true));
