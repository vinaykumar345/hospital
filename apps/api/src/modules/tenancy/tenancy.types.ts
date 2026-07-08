export interface Tenant {
  id: string;
  name: string;
  slug: string;
  primaryContactEmail: string;
  status: "ACTIVE" | "SUSPENDED" | "PENDING";
  subscriptionPlan: string;
}

export interface TenantBranding {
  tenantId: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  mobileAppName: string;
}

export interface TenantDomain {
  tenantId: string;
  domain: string;
  verificationStatus: "PENDING" | "VERIFIED" | "FAILED";
}
