create table if not exists staff_profiles (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  user_id uuid not null references user_credentials(id) on delete cascade,
  role text not null,
  full_name text not null,
  email text not null,
  job_title text null,
  license_number text null,
  department_id uuid references departments(id) on delete set null,
  branch_id uuid references branches(id) on delete set null,
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'ON_LEAVE', 'SUSPENDED', 'OFFBOARDED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, user_id),
  unique (tenant_id, email)
);

create index if not exists staff_profiles_tenant_role_idx on staff_profiles (tenant_id, role, status);
create index if not exists staff_profiles_department_idx on staff_profiles (tenant_id, department_id, status);
create index if not exists staff_profiles_branch_idx on staff_profiles (tenant_id, branch_id, status);

alter table staff_profiles enable row level security;

drop policy if exists staff_profiles_tenant_isolation on staff_profiles;
create policy staff_profiles_tenant_isolation on staff_profiles
  using (tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id::text = current_setting('app.tenant_id', true));
