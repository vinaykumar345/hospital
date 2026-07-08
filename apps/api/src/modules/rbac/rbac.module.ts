import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import { PostgresRbacRepository } from "./postgres-rbac.repository.js";
import { RBAC_REPOSITORY } from "./rbac.constants.js";
import { RbacController } from "./rbac.controller.js";
import { RbacService } from "./rbac.service.js";

@Module({
  imports: [DatabaseModule],
  controllers: [RbacController],
  providers: [
    RbacService,
    RbacGuard,
    PostgresRbacRepository,
    {
      provide: RBAC_REPOSITORY,
      useExisting: PostgresRbacRepository
    }
  ],
  exports: [RbacService, RbacGuard]
})
export class RbacModule {}
