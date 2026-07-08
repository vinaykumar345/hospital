create table if not exists subscription_plans (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  monthly_price numeric not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists tenant_subscriptions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  plan_id uuid not null references subscription_plans(id) on delete restrict,
  status text not null default 'ACTIVE' check (status in ('TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELLED', 'SUSPENDED')),
  billing_interval text not null check (billing_interval in ('MONTHLY', 'ANNUAL')),
  provider_customer_id text null,
  current_period_start timestamptz not null default now(),
  current_period_end timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id)
);

create table if not exists subscription_invoices (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  subscription_id uuid not null references tenant_subscriptions(id) on delete cascade,
  amount numeric not null,
  status text not null default 'OPEN' check (status in ('OPEN', 'PAID', 'VOID', 'UNCOLLECTIBLE')),
  provider_invoice_id text null,
  created_at timestamptz not null default now()
);

create index if not exists tenant_subscriptions_status_idx on tenant_subscriptions (tenant_id, status);
create index if not exists subscription_invoices_status_idx on subscription_invoices (tenant_id, status, created_at desc);

alter table tenant_subscriptions enable row level security;
alter table subscription_invoices enable row level security;

drop policy if exists tenant_subscriptions_tenant_isolation on tenant_subscriptions;
create policy tenant_subscriptions_tenant_isolation on tenant_subscriptions using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists subscription_invoices_tenant_isolation on subscription_invoices;
create policy subscription_invoices_tenant_isolation on subscription_invoices using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));

insert into subscription_plans (code, name, monthly_price)
values
  ('STARTER', 'Starter', 199),
  ('PROFESSIONAL', 'Professional', 499),
  ('ENTERPRISE', 'Enterprise', 999)
on conflict (code) do nothing;
