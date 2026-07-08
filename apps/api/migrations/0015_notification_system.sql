create table if not exists notification_templates (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  code text not null,
  channel text not null check (channel in ('EMAIL', 'SMS', 'PUSH', 'WHATSAPP')),
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, code, channel)
);

create table if not exists notification_deliveries (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  channel text not null check (channel in ('EMAIL', 'SMS', 'PUSH', 'WHATSAPP')),
  recipient text not null,
  template_code text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'PENDING' check (status in ('PENDING', 'SENT', 'FAILED', 'CANCELLED')),
  attempts integer not null default 0,
  provider_message_id text null,
  next_attempt_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  sent_at timestamptz null
);

create table if not exists notification_preferences (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  user_id uuid not null references user_credentials(id) on delete cascade,
  channel text not null check (channel in ('EMAIL', 'SMS', 'PUSH', 'WHATSAPP')),
  status text not null default 'ENABLED' check (status in ('ENABLED', 'DISABLED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, user_id, channel)
);

create index if not exists notification_deliveries_due_idx on notification_deliveries (tenant_id, status, next_attempt_at);
create index if not exists notification_preferences_user_idx on notification_preferences (tenant_id, user_id);

alter table notification_templates enable row level security;
alter table notification_deliveries enable row level security;
alter table notification_preferences enable row level security;

drop policy if exists notification_templates_tenant_isolation on notification_templates;
create policy notification_templates_tenant_isolation on notification_templates using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists notification_deliveries_tenant_isolation on notification_deliveries;
create policy notification_deliveries_tenant_isolation on notification_deliveries using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists notification_preferences_tenant_isolation on notification_preferences;
create policy notification_preferences_tenant_isolation on notification_preferences using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
