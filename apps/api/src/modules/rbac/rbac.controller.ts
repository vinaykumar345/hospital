import { Body, Controller, Delete, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import { RolePermissionDto, TenantQueryDto } from "./dto/rbac.dto.js";
import { RbacService } from "./rbac.service.js";

@ApiTags("rbac")
@Controller("rbac")
@UseGuards(RbacGuard)
export class RbacController {
  constructor(private readonly rbac: RbacService) {}

  @Get("role-permissions")
  @RequirePermissions("ROLE_MANAGE")
  listRolePermissions(@Query() query: TenantQueryDto) {
    return this.rbac.listRolePermissions(query.tenantId ?? null);
  }

  @Post("role-permissions")
  @RequirePermissions("ROLE_MANAGE")
  grant(@Body() dto: RolePermissionDto) {
    return this.rbac.grant(dto);
  }

  @Delete("role-permissions")
  @RequirePermissions("ROLE_MANAGE")
  revoke(@Body() dto: RolePermissionDto) {
    return this.rbac.revoke(dto);
  }
}
