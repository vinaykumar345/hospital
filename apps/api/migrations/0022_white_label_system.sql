create table if not exists white_label_theme_extensions (
  tenant_id uuid primary key references tenants(id) on delete cascade,
  accent_color text null,
  custom_css text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists white_label_assets (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  asset_type text not null check (asset_type in ('LOGO', 'FAVICON', 'MOBILE_SPLASH', 'EMAIL_HEADER')),
  s3_key text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, asset_type)
);

create table if not exists white_label_email_templates (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  template_code text not null,
  subject text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, template_code)
);

alter table white_label_theme_extensions enable row level security;
alter table white_label_assets enable row level security;
alter table white_label_email_templates enable row level security;

drop policy if exists white_label_theme_extensions_tenant_isolation on white_label_theme_extensions;
create policy white_label_theme_extensions_tenant_isolation on white_label_theme_extensions using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists white_label_assets_tenant_isolation on white_label_assets;
create policy white_label_assets_tenant_isolation on white_label_assets using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
drop policy if exists white_label_email_templates_tenant_isolation on white_label_email_templates;
create policy white_label_email_templates_tenant_isolation on white_label_email_templates using (tenant_id::text = current_setting('app.tenant_id', true)) with check (tenant_id::text = current_setting('app.tenant_id', true));
