import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { PostgresStaffRepository } from "./postgres-staff.repository.js";
import { STAFF_REPOSITORY } from "./staff.constants.js";
import { StaffController } from "./staff.controller.js";
import { StaffService } from "./staff.service.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [StaffController],
  providers: [
    StaffService,
    PostgresStaffRepository,
    {
      provide: STAFF_REPOSITORY,
      useExisting: PostgresStaffRepository
    }
  ]
})
export class StaffModule {}
