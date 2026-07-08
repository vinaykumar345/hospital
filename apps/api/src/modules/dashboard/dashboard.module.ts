import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { DASHBOARD_REPOSITORY } from "./dashboard.constants.js";
import { DashboardController } from "./dashboard.controller.js";
import { DashboardService } from "./dashboard.service.js";
import { PostgresDashboardRepository } from "./postgres-dashboard.repository.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    PostgresDashboardRepository,
    {
      provide: DASHBOARD_REPOSITORY,
      useExisting: PostgresDashboardRepository
    }
  ]
})
export class DashboardModule {}
