import { Injectable } from "@nestjs/common";
import { PermissionName, RoleName } from "@hospital/shared";
import { PostgresService } from "../../common/database/postgres.service.js";
import { RbacRepository, RolePermissionView } from "./rbac.repository.js";

interface RolePermissionRow {
  role: RoleName;
  permissions: PermissionName[];
}

@Injectable()
export class PostgresRbacRepository implements RbacRepository {
  constructor(private readonly postgres: PostgresService) {}

  async listRolePermissions(tenantId: string | null): Promise<RolePermissionView[]> {
    const result = await this.postgres.query<RolePermissionRow>(
      `select r.name as role, coalesce(array_agg(p.name) filter (where p.name is not null), array[]::text[]) as permissions
       from roles r
       left join role_permissions rp on rp.role_id = r.id
       left join permissions p on p.id = rp.permission_id
       where r.tenant_id is not distinct from $1 or r.tenant_id is null
       group by r.name
       order by r.name`,
      [tenantId]
    );

    return result.rows;
  }

  async grantPermission(tenantId: string | null, role: RoleName, permission: PermissionName) {
    await this.postgres.query(
      `insert into role_permissions (role_id, permission_id)
       select r.id, p.id
       from roles r, permissions p
       where r.name = $1 and (r.tenant_id is not distinct from $3 or r.tenant_id is null) and p.name = $2
       on conflict do nothing`,
      [role, permission, tenantId]
    );
  }

  async revokePermission(tenantId: string | null, role: RoleName, permission: PermissionName) {
    await this.postgres.query(
      `delete from role_permissions rp
       using roles r, permissions p
       where rp.role_id = r.id and rp.permission_id = p.id
         and r.name = $1 and (r.tenant_id is not distinct from $3 or r.tenant_id is null) and p.name = $2`,
      [role, permission, tenantId]
    );
  }
}
