create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  primary_contact_email text not null,
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'SUSPENDED', 'PENDING')),
  subscription_plan text not null default 'STARTER',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists tenant_domains (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  domain text not null unique,
  verification_status text not null default 'PENDING' check (verification_status in ('PENDING', 'VERIFIED', 'FAILED')),
  created_at timestamptz not null default now(),
  verified_at timestamptz null
);

create index if not exists tenant_domains_tenant_idx on tenant_domains (tenant_id);

create table if not exists tenant_branding (
  tenant_id uuid primary key references tenants(id) on delete cascade,
  logo_url text null,
  primary_color text not null default '#1D6F66',
  secondary_color text not null default '#F5F7FB',
  mobile_app_name text not null default 'AI Hospital Assistant',
  email_from_name text not null default 'AI Hospital Assistant',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists hospital_profiles (
  tenant_id uuid primary key references tenants(id) on delete cascade,
  legal_name text not null,
  registration_number text null,
  address_line1 text null,
  address_line2 text null,
  city text null,
  state text null,
  country text null,
  postal_code text null,
  timezone text not null default 'UTC',
  phone text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'user_credentials_tenant_fk') then
    alter table user_credentials
      add constraint user_credentials_tenant_fk foreign key (tenant_id) references tenants(id) on delete cascade;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'auth_sessions_tenant_fk') then
    alter table auth_sessions
      add constraint auth_sessions_tenant_fk foreign key (tenant_id) references tenants(id) on delete cascade;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'audit_events_tenant_fk') then
    alter table audit_events
      add constraint audit_events_tenant_fk foreign key (tenant_id) references tenants(id) on delete cascade;
  end if;
end $$;

alter table user_credentials enable row level security;
alter table auth_sessions enable row level security;
alter table auth_otps enable row level security;
alter table auth_delivery_outbox enable row level security;
alter table audit_events enable row level security;

drop policy if exists tenant_user_credentials_isolation on user_credentials;
create policy tenant_user_credentials_isolation on user_credentials
  using (tenant_id is null or tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id is null or tenant_id::text = current_setting('app.tenant_id', true));

drop policy if exists tenant_auth_sessions_isolation on auth_sessions;
create policy tenant_auth_sessions_isolation on auth_sessions
  using (tenant_id is null or tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id is null or tenant_id::text = current_setting('app.tenant_id', true));

drop policy if exists tenant_auth_otps_isolation on auth_otps;
create policy tenant_auth_otps_isolation on auth_otps
  using (tenant_id is null or tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id is null or tenant_id::text = current_setting('app.tenant_id', true));

drop policy if exists tenant_auth_delivery_outbox_isolation on auth_delivery_outbox;
create policy tenant_auth_delivery_outbox_isolation on auth_delivery_outbox
  using (tenant_id is null or tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id is null or tenant_id::text = current_setting('app.tenant_id', true));

drop policy if exists tenant_audit_events_isolation on audit_events;
create policy tenant_audit_events_isolation on audit_events
  using (tenant_id is null or tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id is null or tenant_id::text = current_setting('app.tenant_id', true));
