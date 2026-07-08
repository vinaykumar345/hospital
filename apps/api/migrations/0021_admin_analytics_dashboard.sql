create table if not exists admin_operational_insights (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  insight_text text not null,
  disclaimer text not null,
  source_metric text null,
  created_at timestamptz not null default now()
);

create index if not exists admin_operational_insights_tenant_idx
  on admin_operational_insights (tenant_id, created_at desc);

alter table admin_operational_insights enable row level security;

drop policy if exists admin_operational_insights_tenant_isolation on admin_operational_insights;
create policy admin_operational_insights_tenant_isolation on admin_operational_insights
  using (tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id::text = current_setting('app.tenant_id', true));
