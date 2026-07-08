import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { PATIENT_REPOSITORY } from "./patient.constants.js";
import { PatientController } from "./patient.controller.js";
import { PatientService } from "./patient.service.js";
import { PostgresPatientRepository } from "./postgres-patient.repository.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [PatientController],
  providers: [
    PatientService,
    PostgresPatientRepository,
    {
      provide: PATIENT_REPOSITORY,
      useExisting: PostgresPatientRepository
    }
  ]
})
export class PatientModule {}
