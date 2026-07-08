import { Inject, Injectable } from "@nestjs/common";
import { RolePermissionDto } from "./dto/rbac.dto.js";
import { RBAC_REPOSITORY } from "./rbac.constants.js";
import { RbacRepository } from "./rbac.repository.js";

@Injectable()
export class RbacService {
  constructor(@Inject(RBAC_REPOSITORY) private readonly repository: RbacRepository) {}

  listRolePermissions(tenantId: string | null) {
    return this.repository.listRolePermissions(tenantId);
  }

  async grant(dto: RolePermissionDto) {
    await this.repository.grantPermission(dto.tenantId ?? null, dto.role, dto.permission);
    return { granted: true };
  }

  async revoke(dto: RolePermissionDto) {
    await this.repository.revokePermission(dto.tenantId ?? null, dto.role, dto.permission);
    return { revoked: true };
  }
}
