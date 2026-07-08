create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  invoice_number text not null default ('INV-' || upper(substr(gen_random_uuid()::text, 1, 10))),
  status text not null default 'DRAFT' check (status in ('DRAFT', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'VOID')),
  total_amount numeric not null default 0,
  discount_amount numeric not null default 0,
  gst_amount numeric not null default 0,
  paid_amount numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, invoice_number)
);

create table if not exists invoice_lines (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  invoice_id uuid not null references invoices(id) on delete cascade,
  line_type text not null check (line_type in ('CONSULTATION', 'PROCEDURE', 'LAB', 'PHARMACY', 'PACKAGE')),
  description text not null,
  amount numeric not null,
  gst_rate numeric not null default 0,
  gst_amount numeric not null default 0,
  discount_amount numeric not null default 0,
  total_amount numeric not null,
  created_at timestamptz not null default now()
);

create table if not exists invoice_payments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  invoice_id uuid not null references invoices(id) on delete cascade,
  amount numeric not null,
  method text not null check (method in ('CASH', 'CARD', 'UPI', 'BANK_TRANSFER', 'PAYMENT_GATEWAY')),
  gateway_reference text null,
  paid_at timestamptz not null default now()
);

create index if not exists invoices_patient_idx on invoices (tenant_id, patient_id, created_at desc);
create index if not exists invoice_lines_invoice_idx on invoice_lines (tenant_id, invoice_id);
create index if not exists invoice_payments_invoice_idx on invoice_payments (tenant_id, invoice_id);

alter table invoices enable row level security;
alter table invoice_lines enable row level security;
alter table invoice_payments enable row level security;

drop policy if exists invoices_tenant_isolation on invoices;
create policy invoices_tenant_isolation on invoices using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists invoice_lines_tenant_isolation on invoice_lines;
create policy invoice_lines_tenant_isolation on invoice_lines using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists invoice_payments_tenant_isolation on invoice_payments;
create policy invoice_payments_tenant_isolation on invoice_payments using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
