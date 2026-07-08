export interface TenantContext {
  tenantId: string;
  source: "JWT" | "DOMAIN" | "HEADER";
}

export const TENANT_CONTEXT_HEADER = "x-tenant-id";
