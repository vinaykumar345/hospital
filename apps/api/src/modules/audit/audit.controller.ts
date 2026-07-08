import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import { AuditService } from "./audit.service.js";
import { AuditQueryDto } from "./dto/audit.dto.js";

@ApiTags("audit")
@Controller("audit")
@UseGuards(RbacGuard)
export class AuditController {
  constructor(private readonly audit: AuditService) {}

  @Get("events")
  @RequirePermissions("AUDIT_READ")
  listEvents(@Query() query: AuditQueryDto) {
    return this.audit.listEvents(query);
  }
}
