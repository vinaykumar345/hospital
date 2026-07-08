import { Tenant, TenantBranding, TenantDomain } from "./tenancy.types.js";

export interface CreateTenantInput {
  name: string;
  slug: string;
  primaryContactEmail: string;
  domain?: string;
}

export interface UpdateTenantBrandingInput {
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  mobileAppName?: string;
}

export interface TenancyRepository {
  createTenant(input: CreateTenantInput): Promise<Tenant>;
  findTenantById(tenantId: string): Promise<Tenant | null>;
  findTenantByDomain(domain: string): Promise<Tenant | null>;
  getBranding(tenantId: string): Promise<TenantBranding | null>;
  updateBranding(tenantId: string, input: UpdateTenantBrandingInput): Promise<TenantBranding>;
  addDomain(tenantId: string, domain: string): Promise<TenantDomain>;
}
