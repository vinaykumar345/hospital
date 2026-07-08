create table if not exists ai_agent_interactions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  patient_id uuid references patients(id) on delete set null,
  agent_type text not null check (agent_type in ('RECEPTION', 'DOCTOR', 'NURSE', 'PATIENT')),
  user_message text not null,
  response_text text not null,
  disclaimer text not null,
  reviewed_by_user_id uuid references user_credentials(id) on delete set null,
  reviewed_at timestamptz null,
  created_at timestamptz not null default now()
);

create table if not exists reception_agent_actions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  interaction_id uuid not null references ai_agent_interactions(id) on delete cascade,
  action_type text not null check (action_type in ('BOOK_APPOINTMENT', 'ROUTE_DEPARTMENT', 'QUEUE_UPDATE', 'FAQ_RESPONSE')),
  payload jsonb not null,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'CONFIRMED', 'DISMISSED')),
  created_at timestamptz not null default now(),
  confirmed_at timestamptz null
);

create index if not exists ai_agent_interactions_tenant_idx on ai_agent_interactions (tenant_id, agent_type, created_at desc);
create index if not exists reception_agent_actions_status_idx on reception_agent_actions (tenant_id, status, action_type);

alter table ai_agent_interactions enable row level security;
alter table reception_agent_actions enable row level security;

drop policy if exists ai_agent_interactions_tenant_isolation on ai_agent_interactions;
create policy ai_agent_interactions_tenant_isolation on ai_agent_interactions using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists reception_agent_actions_tenant_isolation on reception_agent_actions;
create policy reception_agent_actions_tenant_isolation on reception_agent_actions using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
