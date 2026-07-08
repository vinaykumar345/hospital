create table if not exists voice_follow_up_campaigns (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  campaign_type text not null check (campaign_type in ('POST_VISIT', 'MEDICATION_ADHERENCE', 'LAB_FOLLOW_UP', 'APPOINTMENT_REMINDER')),
  reviewed_script text not null,
  disclaimer text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists voice_follow_up_calls (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  campaign_id uuid not null references voice_follow_up_campaigns(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  phone_number text not null,
  status text not null default 'QUEUED' check (status in ('QUEUED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED')),
  outcome text null,
  provider_call_id text null,
  scheduled_for timestamptz not null default now(),
  completed_at timestamptz null,
  created_at timestamptz not null default now()
);

create index if not exists voice_follow_up_campaigns_tenant_idx on voice_follow_up_campaigns (tenant_id, campaign_type, active);
create index if not exists voice_follow_up_calls_status_idx on voice_follow_up_calls (tenant_id, status, scheduled_for);

alter table voice_follow_up_campaigns enable row level security;
alter table voice_follow_up_calls enable row level security;

drop policy if exists voice_follow_up_campaigns_tenant_isolation on voice_follow_up_campaigns;
create policy voice_follow_up_campaigns_tenant_isolation on voice_follow_up_campaigns
  using (tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id::text = current_setting('app.tenant_id', true));

drop policy if exists voice_follow_up_calls_tenant_isolation on voice_follow_up_calls;
create policy voice_follow_up_calls_tenant_isolation on voice_follow_up_calls
  using (tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id::text = current_setting('app.tenant_id', true));
