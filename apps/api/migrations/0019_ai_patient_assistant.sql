create table if not exists patient_assistant_responses (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  interaction_id uuid not null references ai_agent_interactions(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  request_type text not null check (request_type in ('HOSPITAL_FAQ', 'REPORT_EXPLANATION', 'PATIENT_EDUCATION', 'APPOINTMENT_RECOMMENDATION', 'FOLLOW_UP_REMINDER')),
  response_text text not null,
  disclaimer text not null,
  created_at timestamptz not null default now()
);

create index if not exists patient_assistant_responses_lookup_idx
  on patient_assistant_responses (tenant_id, patient_id, request_type, created_at desc);

alter table patient_assistant_responses enable row level security;

drop policy if exists patient_assistant_responses_tenant_isolation on patient_assistant_responses;
create policy patient_assistant_responses_tenant_isolation on patient_assistant_responses
  using (tenant_id::text = current_setting('app.tenant_id', true))
  with check (tenant_id::text = current_setting('app.tenant_id', true));
