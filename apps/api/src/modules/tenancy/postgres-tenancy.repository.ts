import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import { CreateTenantInput, TenancyRepository, UpdateTenantBrandingInput } from "./tenancy.repository.js";
import { Tenant, TenantBranding, TenantDomain } from "./tenancy.types.js";

interface TenantRow {
  id: string;
  name: string;
  slug: string;
  primary_contact_email: string;
  status: Tenant["status"];
  subscription_plan: string;
}

interface BrandingRow {
  tenant_id: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  mobile_app_name: string;
}

interface DomainRow {
  tenant_id: string;
  domain: string;
  verification_status: TenantDomain["verificationStatus"];
}

@Injectable()
export class PostgresTenancyRepository implements TenancyRepository {
  constructor(private readonly postgres: PostgresService) {}

  async createTenant(input: CreateTenantInput): Promise<Tenant> {
    const result = await this.postgres.query<TenantRow>(
      `insert into tenants (name, slug, primary_contact_email)
       values ($1, $2, $3)
       returning id, name, slug, primary_contact_email, status, subscription_plan`,
      [input.name, input.slug, input.primaryContactEmail]
    );

    const tenant = this.toTenant(result.rows[0]);

    await this.postgres.query(
      `insert into tenant_branding (tenant_id, mobile_app_name) values ($1, $2)
       on conflict (tenant_id) do nothing`,
      [tenant.id, tenant.name]
    );

    if (input.domain) {
      await this.addDomain(tenant.id, input.domain);
    }

    return tenant;
  }

  async findTenantById(tenantId: string): Promise<Tenant | null> {
    const result = await this.postgres.query<TenantRow>(
      `select id, name, slug, primary_contact_email, status, subscription_plan from tenants where id = $1`,
      [tenantId]
    );

    return result.rows[0] ? this.toTenant(result.rows[0]) : null;
  }

  async findTenantByDomain(domain: string): Promise<Tenant | null> {
    const result = await this.postgres.query<TenantRow>(
      `select t.id, t.name, t.slug, t.primary_contact_email, t.status, t.subscription_plan
       from tenants t
       inner join tenant_domains td on td.tenant_id = t.id
       where td.domain = lower($1) and t.status = 'ACTIVE'`,
      [domain]
    );

    return result.rows[0] ? this.toTenant(result.rows[0]) : null;
  }

  async getBranding(tenantId: string): Promise<TenantBranding | null> {
    const result = await this.postgres.query<BrandingRow>(
      `select tenant_id, logo_url, primary_color, secondary_color, mobile_app_name
       from tenant_branding
       where tenant_id = $1`,
      [tenantId]
    );

    return result.rows[0] ? this.toBranding(result.rows[0]) : null;
  }

  async updateBranding(tenantId: string, input: UpdateTenantBrandingInput): Promise<TenantBranding> {
    const result = await this.postgres.query<BrandingRow>(
      `insert into tenant_branding (tenant_id, logo_url, primary_color, secondary_color, mobile_app_name)
       values ($1, $2, coalesce($3, '#1D6F66'), coalesce($4, '#F5F7FB'), coalesce($5, 'AI Hospital Assistant'))
       on conflict (tenant_id) do update set
         logo_url = coalesce(excluded.logo_url, tenant_branding.logo_url),
         primary_color = coalesce(excluded.primary_color, tenant_branding.primary_color),
         secondary_color = coalesce(excluded.secondary_color, tenant_branding.secondary_color),
         mobile_app_name = coalesce(excluded.mobile_app_name, tenant_branding.mobile_app_name),
         updated_at = now()
       returning tenant_id, logo_url, primary_color, secondary_color, mobile_app_name`,
      [tenantId, input.logoUrl ?? null, input.primaryColor ?? null, input.secondaryColor ?? null, input.mobileAppName ?? null]
    );

    return this.toBranding(result.rows[0]);
  }

  async addDomain(tenantId: string, domain: string): Promise<TenantDomain> {
    const result = await this.postgres.query<DomainRow>(
      `insert into tenant_domains (tenant_id, domain)
       values ($1, lower($2))
       on conflict (domain) do update set tenant_id = excluded.tenant_id
       returning tenant_id, domain, verification_status`,
      [tenantId, domain]
    );

    return this.toDomain(result.rows[0]);
  }

  private toTenant(row: TenantRow): Tenant {
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      primaryContactEmail: row.primary_contact_email,
      status: row.status,
      subscriptionPlan: row.subscription_plan
    };
  }

  private toBranding(row: BrandingRow): TenantBranding {
    return {
      tenantId: row.tenant_id,
      logoUrl: row.logo_url,
      primaryColor: row.primary_color,
      secondaryColor: row.secondary_color,
      mobileAppName: row.mobile_app_name
    };
  }

  private toDomain(row: DomainRow): TenantDomain {
    return {
      tenantId: row.tenant_id,
      domain: row.domain,
      verificationStatus: row.verification_status
    };
  }
}
