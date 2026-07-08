create table if not exists medicines (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  generic_name text null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, name)
);

create table if not exists pharmacy_stock_lots (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  medicine_id uuid not null references medicines(id) on delete cascade,
  batch_number text not null,
  quantity_available numeric not null default 0,
  expires_on date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, medicine_id, batch_number)
);

create table if not exists prescriptions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  prescribed_by_user_id uuid not null references user_credentials(id) on delete restrict,
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'DISPENSED', 'CANCELLED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists prescription_items (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  prescription_id uuid not null references prescriptions(id) on delete cascade,
  medicine_id uuid not null references medicines(id) on delete restrict,
  dosage text not null,
  frequency text not null,
  duration text not null,
  created_at timestamptz not null default now()
);

create table if not exists pharmacy_dispenses (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  prescription_item_id uuid not null references prescription_items(id) on delete restrict,
  stock_lot_id uuid not null references pharmacy_stock_lots(id) on delete restrict,
  quantity numeric not null,
  dispensed_at timestamptz not null default now()
);

create table if not exists pharmacy_interaction_warnings (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  prescription_id uuid not null references prescriptions(id) on delete cascade,
  severity text not null check (severity in ('LOW', 'MODERATE', 'HIGH')),
  message text not null,
  reviewed_at timestamptz null,
  created_at timestamptz not null default now()
);

create table if not exists pharmacy_expiry_alerts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  stock_lot_id uuid not null references pharmacy_stock_lots(id) on delete cascade,
  message text not null,
  acknowledged_at timestamptz null,
  created_at timestamptz not null default now()
);

create index if not exists pharmacy_stock_lots_expiry_idx on pharmacy_stock_lots (tenant_id, expires_on, quantity_available);
create index if not exists prescriptions_patient_idx on prescriptions (tenant_id, patient_id, created_at desc);
create index if not exists pharmacy_interaction_warnings_open_idx on pharmacy_interaction_warnings (tenant_id, reviewed_at, severity);
create index if not exists pharmacy_expiry_alerts_open_idx on pharmacy_expiry_alerts (tenant_id, acknowledged_at, created_at desc);

alter table medicines enable row level security;
alter table pharmacy_stock_lots enable row level security;
alter table prescriptions enable row level security;
alter table prescription_items enable row level security;
alter table pharmacy_dispenses enable row level security;
alter table pharmacy_interaction_warnings enable row level security;
alter table pharmacy_expiry_alerts enable row level security;

drop policy if exists medicines_tenant_isolation on medicines;
create policy medicines_tenant_isolation on medicines using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists pharmacy_stock_lots_tenant_isolation on pharmacy_stock_lots;
create policy pharmacy_stock_lots_tenant_isolation on pharmacy_stock_lots using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists prescriptions_tenant_isolation on prescriptions;
create policy prescriptions_tenant_isolation on prescriptions using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists prescription_items_tenant_isolation on prescription_items;
create policy prescription_items_tenant_isolation on prescription_items using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists pharmacy_dispenses_tenant_isolation on pharmacy_dispenses;
create policy pharmacy_dispenses_tenant_isolation on pharmacy_dispenses using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists pharmacy_interaction_warnings_tenant_isolation on pharmacy_interaction_warnings;
create policy pharmacy_interaction_warnings_tenant_isolation on pharmacy_interaction_warnings using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists pharmacy_expiry_alerts_tenant_isolation on pharmacy_expiry_alerts;
create policy pharmacy_expiry_alerts_tenant_isolation on pharmacy_expiry_alerts using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
