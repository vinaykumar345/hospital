create table if not exists lab_tests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  code text not null,
  name text not null,
  specimen_type text null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, code)
);

create table if not exists lab_orders (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  ordered_by_user_id uuid not null references user_credentials(id) on delete restrict,
  lab_test_id uuid not null references lab_tests(id) on delete restrict,
  status text not null default 'ORDERED' check (status in ('ORDERED', 'SAMPLE_COLLECTED', 'PROCESSING', 'RESULTED', 'CANCELLED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists lab_samples (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  lab_order_id uuid not null references lab_orders(id) on delete cascade,
  barcode text not null default upper(substr(gen_random_uuid()::text, 1, 12)),
  status text not null check (status in ('ORDERED', 'COLLECTED', 'IN_TRANSIT', 'RECEIVED', 'PROCESSING', 'REJECTED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, barcode)
);

create table if not exists lab_results (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  lab_order_id uuid not null references lab_orders(id) on delete cascade,
  result_value text not null,
  reference_range text null,
  interpretation text not null check (interpretation in ('NORMAL', 'ABNORMAL', 'CRITICAL')),
  verified_by_user_id uuid references user_credentials(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists lab_critical_alerts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  lab_result_id uuid not null references lab_results(id) on delete cascade,
  severity text not null default 'CRITICAL',
  message text not null,
  acknowledged_at timestamptz null,
  created_at timestamptz not null default now()
);

create table if not exists lab_result_summary_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  lab_result_id uuid not null references lab_results(id) on delete cascade,
  status text not null default 'PENDING' check (status in ('PENDING', 'GENERATED', 'FAILED')),
  plain_language_summary text null,
  disclaimer text not null,
  created_at timestamptz not null default now(),
  generated_at timestamptz null
);

create index if not exists lab_orders_patient_idx on lab_orders (tenant_id, patient_id, created_at desc);
create index if not exists lab_samples_status_idx on lab_samples (tenant_id, status);
create index if not exists lab_critical_alerts_open_idx on lab_critical_alerts (tenant_id, acknowledged_at, created_at desc);

alter table lab_tests enable row level security;
alter table lab_orders enable row level security;
alter table lab_samples enable row level security;
alter table lab_results enable row level security;
alter table lab_critical_alerts enable row level security;
alter table lab_result_summary_requests enable row level security;

drop policy if exists lab_tests_tenant_isolation on lab_tests;
create policy lab_tests_tenant_isolation on lab_tests using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists lab_orders_tenant_isolation on lab_orders;
create policy lab_orders_tenant_isolation on lab_orders using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists lab_samples_tenant_isolation on lab_samples;
create policy lab_samples_tenant_isolation on lab_samples using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists lab_results_tenant_isolation on lab_results;
create policy lab_results_tenant_isolation on lab_results using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists lab_critical_alerts_tenant_isolation on lab_critical_alerts;
create policy lab_critical_alerts_tenant_isolation on lab_critical_alerts using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists lab_result_summary_requests_tenant_isolation on lab_result_summary_requests;
create policy lab_result_summary_requests_tenant_isolation on lab_result_summary_requests using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
