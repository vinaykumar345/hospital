export interface RequestUser {
  id: string;
  tenantId: string | null;
  roles: string[];
  permissions: string[];
}

export interface AuthenticatedRequest {
  user?: RequestUser;
}
