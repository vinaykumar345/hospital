create table if not exists nurse_agent_outputs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  interaction_id uuid not null references ai_agent_interactions(id) on delete cascade,
  nurse_user_id uuid not null references user_credentials(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  output_type text not null check (output_type in ('SHIFT_HANDOVER', 'MEDICATION_SCHEDULE', 'NURSING_TASKS', 'VITAL_SIGNS_NOTE', 'OBSERVATION_LOG')),
  draft_text text not null,
  disclaimer text not null,
  review_status text not null default 'PENDING_REVIEW' check (review_status in ('PENDING_REVIEW', 'ACCEPTED', 'EDITED', 'REJECTED')),
  reviewed_by_user_id uuid references user_credentials(id) on delete set null,
  reviewed_at timestamptz null,
  created_at timestamptz not null default now()
);

create index if not exists nurse_agent_outputs_lookup_idx
  on nurse_agent_outputs (tenant_id, nurse_user_id, patient_id, output_type, created_at desc);

alter table nurse_agent_outputs enable row level security;

drop policy if exists nurse_agent_outputs_tenant_isolation on nurse_agent_outputs;
create policy nurse_agent_outputs_tenant_isolation on nurse_agent_outputs
  using (tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id::text = current_setting('app.tenant_id', true));
