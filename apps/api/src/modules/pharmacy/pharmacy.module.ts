import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { PHARMACY_REPOSITORY } from "./pharmacy.constants.js";
import { PharmacyController } from "./pharmacy.controller.js";
import { PharmacyService } from "./pharmacy.service.js";
import { PostgresPharmacyRepository } from "./postgres-pharmacy.repository.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [PharmacyController],
  providers: [
    PharmacyService,
    PostgresPharmacyRepository,
    {
      provide: PHARMACY_REPOSITORY,
      useExisting: PostgresPharmacyRepository
    }
  ]
})
export class PharmacyModule {}
