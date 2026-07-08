import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { BILLING_REPOSITORY } from "./billing.constants.js";
import { BillingController } from "./billing.controller.js";
import { BillingService } from "./billing.service.js";
import { PostgresBillingRepository } from "./postgres-billing.repository.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [BillingController],
  providers: [
    BillingService,
    PostgresBillingRepository,
    {
      provide: BILLING_REPOSITORY,
      useExisting: PostgresBillingRepository
    }
  ]
})
export class BillingModule {}
