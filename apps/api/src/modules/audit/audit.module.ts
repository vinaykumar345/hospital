import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { AUDIT_REPOSITORY } from "./audit.constants.js";
import { AuditController } from "./audit.controller.js";
import { AuditService } from "./audit.service.js";
import { PostgresAuditRepository } from "./postgres-audit.repository.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [AuditController],
  providers: [
    AuditService,
    PostgresAuditRepository,
    {
      provide: AUDIT_REPOSITORY,
      useExisting: PostgresAuditRepository
    }
  ]
})
export class AuditModule {}
