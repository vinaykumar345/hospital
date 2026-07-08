import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { LABORATORY_REPOSITORY } from "./laboratory.constants.js";
import { LaboratoryController } from "./laboratory.controller.js";
import { LaboratoryService } from "./laboratory.service.js";
import { PostgresLaboratoryRepository } from "./postgres-laboratory.repository.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [LaboratoryController],
  providers: [
    LaboratoryService,
    PostgresLaboratoryRepository,
    {
      provide: LABORATORY_REPOSITORY,
      useExisting: PostgresLaboratoryRepository
    }
  ]
})
export class LaboratoryModule {}
