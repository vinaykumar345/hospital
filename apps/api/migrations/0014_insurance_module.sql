create table if not exists insurance_policies (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  provider_name text not null,
  policy_number text not null,
  verification_status text not null default 'PENDING' check (verification_status in ('PENDING', 'VERIFIED', 'REJECTED')),
  verification_notes text null,
  verified_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, provider_name, policy_number)
);

create table if not exists insurance_claims (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  policy_id uuid not null references insurance_policies(id) on delete restrict,
  invoice_id uuid not null references invoices(id) on delete restrict,
  status text not null default 'PREPARING' check (status in ('PREPARING', 'SUBMITTED', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'PAID')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists insurance_claim_documents (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  claim_id uuid not null references insurance_claims(id) on delete cascade,
  document_type text not null,
  s3_key text not null,
  created_at timestamptz not null default now()
);

create index if not exists insurance_policies_patient_idx on insurance_policies (tenant_id, patient_id, verification_status);
create index if not exists insurance_claims_status_idx on insurance_claims (tenant_id, status, created_at desc);
create index if not exists insurance_claim_documents_claim_idx on insurance_claim_documents (tenant_id, claim_id);

alter table insurance_policies enable row level security;
alter table insurance_claims enable row level security;
alter table insurance_claim_documents enable row level security;

drop policy if exists insurance_policies_tenant_isolation on insurance_policies;
create policy insurance_policies_tenant_isolation on insurance_policies using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists insurance_claims_tenant_isolation on insurance_claims;
create policy insurance_claims_tenant_isolation on insurance_claims using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists insurance_claim_documents_tenant_isolation on insurance_claim_documents;
create policy insurance_claim_documents_tenant_isolation on insurance_claim_documents using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
