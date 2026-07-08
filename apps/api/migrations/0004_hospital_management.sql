create table if not exists departments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  description text null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, name)
);

create table if not exists branches (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  address_line1 text not null,
  city text null,
  state text null,
  country text null,
  postal_code text null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, name)
);

create table if not exists rooms (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  branch_id uuid not null references branches(id) on delete cascade,
  name text not null,
  type text not null check (type in ('CONSULTATION', 'WARD', 'ICU', 'LAB', 'PHARMACY', 'PROCEDURE')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, branch_id, name)
);

create table if not exists beds (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  room_id uuid not null references rooms(id) on delete cascade,
  label text not null,
  status text not null default 'AVAILABLE' check (status in ('AVAILABLE', 'OCCUPIED', 'CLEANING', 'MAINTENANCE', 'RESERVED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, room_id, label)
);

create table if not exists doctor_schedules (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  doctor_user_id uuid not null references user_credentials(id) on delete cascade,
  branch_id uuid references branches(id) on delete set null,
  department_id uuid references departments(id) on delete set null,
  weekday integer not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  slot_minutes integer not null default 15,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (start_time < end_time)
);

create index if not exists departments_tenant_idx on departments (tenant_id, active);
create index if not exists branches_tenant_idx on branches (tenant_id, active);
create index if not exists rooms_tenant_branch_idx on rooms (tenant_id, branch_id, active);
create index if not exists beds_tenant_status_idx on beds (tenant_id, status);
create index if not exists doctor_schedules_lookup_idx on doctor_schedules (tenant_id, doctor_user_id, weekday, active);

alter table departments enable row level security;
alter table branches enable row level security;
alter table rooms enable row level security;
alter table beds enable row level security;
alter table doctor_schedules enable row level security;

drop policy if exists departments_tenant_isolation on departments;
create policy departments_tenant_isolation on departments
  using (tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id::text = current_setting('app.tenant_id', true));

drop policy if exists branches_tenant_isolation on branches;
create policy branches_tenant_isolation on branches
  using (tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id::text = current_setting('app.tenant_id', true));

drop policy if exists rooms_tenant_isolation on rooms;
create policy rooms_tenant_isolation on rooms
  using (tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id::text = current_setting('app.tenant_id', true));

drop policy if exists beds_tenant_isolation on beds;
create policy beds_tenant_isolation on beds
  using (tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id::text = current_setting('app.tenant_id', true));

drop policy if exists doctor_schedules_tenant_isolation on doctor_schedules;
create policy doctor_schedules_tenant_isolation on doctor_schedules
  using (tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id::text = current_setting('app.tenant_id', true));
