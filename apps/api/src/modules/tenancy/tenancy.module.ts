import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { TENANCY_REPOSITORY } from "./tenancy.constants.js";
import { PostgresTenancyRepository } from "./postgres-tenancy.repository.js";
import { TenancyController } from "./tenancy.controller.js";
import { TenancyService } from "./tenancy.service.js";

@Module({
  imports: [DatabaseModule],
  controllers: [TenancyController],
  providers: [
    TenancyService,
    PostgresTenancyRepository,
    {
      provide: TENANCY_REPOSITORY,
      useExisting: PostgresTenancyRepository
    }
  ],
  exports: [TenancyService]
})
export class TenancyModule {}
