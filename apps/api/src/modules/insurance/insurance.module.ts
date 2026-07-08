import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { INSURANCE_REPOSITORY } from "./insurance.constants.js";
import { InsuranceController } from "./insurance.controller.js";
import { InsuranceService } from "./insurance.service.js";
import { PostgresInsuranceRepository } from "./postgres-insurance.repository.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [InsuranceController],
  providers: [
    InsuranceService,
    PostgresInsuranceRepository,
    {
      provide: INSURANCE_REPOSITORY,
      useExisting: PostgresInsuranceRepository
    }
  ]
})
export class InsuranceModule {}
