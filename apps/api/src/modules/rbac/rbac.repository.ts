import { PermissionName, RoleName } from "@hospital/shared";

export interface RolePermissionView {
  role: RoleName;
  permissions: PermissionName[];
}

export interface RbacRepository {
  listRolePermissions(tenantId: string | null): Promise<RolePermissionView[]>;
  grantPermission(tenantId: string | null, role: RoleName, permission: PermissionName): Promise<void>;
  revokePermission(tenantId: string | null, role: RoleName, permission: PermissionName): Promise<void>;
}
