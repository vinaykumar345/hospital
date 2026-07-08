create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  patient_number text not null default ('P-' || upper(substr(gen_random_uuid()::text, 1, 8))),
  full_name text not null,
  date_of_birth date null,
  sex text not null check (sex in ('FEMALE', 'MALE', 'OTHER', 'UNKNOWN')),
  mobile text null,
  email text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, patient_number)
);

create table if not exists patient_allergies (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  label text not null,
  value text null,
  created_at timestamptz not null default now()
);

create table if not exists patient_medications (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  label text not null,
  value text null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists patient_emergency_contacts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  label text not null,
  value text null,
  created_at timestamptz not null default now()
);

create table if not exists patient_insurance_details (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  label text not null,
  value text null,
  created_at timestamptz not null default now()
);

create table if not exists patient_consents (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  consent_type text not null check (consent_type in ('TREATMENT', 'TELEMEDICINE', 'DATA_SHARING', 'INSURANCE')),
  label text not null,
  value text null,
  created_at timestamptz not null default now()
);

create table if not exists patient_visits (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  visit_type text not null check (visit_type in ('OPD', 'IPD', 'EMERGENCY', 'TELECONSULTATION')),
  label text not null,
  value text null,
  created_at timestamptz not null default now()
);

create index if not exists patients_tenant_search_idx on patients (tenant_id, full_name, mobile);
create index if not exists patient_allergies_patient_idx on patient_allergies (tenant_id, patient_id);
create index if not exists patient_medications_patient_idx on patient_medications (tenant_id, patient_id, active);
create index if not exists patient_visits_patient_idx on patient_visits (tenant_id, patient_id, created_at desc);

alter table patients enable row level security;
alter table patient_allergies enable row level security;
alter table patient_medications enable row level security;
alter table patient_emergency_contacts enable row level security;
alter table patient_insurance_details enable row level security;
alter table patient_consents enable row level security;
alter table patient_visits enable row level security;

drop policy if exists patients_tenant_isolation on patients;
create policy patients_tenant_isolation on patients using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists patient_allergies_tenant_isolation on patient_allergies;
create policy patient_allergies_tenant_isolation on patient_allergies using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists patient_medications_tenant_isolation on patient_medications;
create policy patient_medications_tenant_isolation on patient_medications using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists patient_emergency_contacts_tenant_isolation on patient_emergency_contacts;
create policy patient_emergency_contacts_tenant_isolation on patient_emergency_contacts using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists patient_insurance_details_tenant_isolation on patient_insurance_details;
create policy patient_insurance_details_tenant_isolation on patient_insurance_details using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists patient_consents_tenant_isolation on patient_consents;
create policy patient_consents_tenant_isolation on patient_consents using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists patient_visits_tenant_isolation on patient_visits;
create policy patient_visits_tenant_isolation on patient_visits using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
