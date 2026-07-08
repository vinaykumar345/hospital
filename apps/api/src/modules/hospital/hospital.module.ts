import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { HOSPITAL_REPOSITORY } from "./hospital.constants.js";
import { HospitalController } from "./hospital.controller.js";
import { HospitalService } from "./hospital.service.js";
import { PostgresHospitalRepository } from "./postgres-hospital.repository.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [HospitalController],
  providers: [
    HospitalService,
    PostgresHospitalRepository,
    {
      provide: HOSPITAL_REPOSITORY,
      useExisting: PostgresHospitalRepository
    }
  ]
})
export class HospitalModule {}
