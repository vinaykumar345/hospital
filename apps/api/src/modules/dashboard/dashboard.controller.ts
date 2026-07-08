import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import { DashboardService } from "./dashboard.service.js";
import { AdminAnalyticsQueryDto, DoctorDashboardQueryDto, NurseDashboardQueryDto, ReceptionDashboardQueryDto } from "./dto/dashboard.dto.js";

@ApiTags("dashboards")
@Controller("dashboards")
@UseGuards(RbacGuard)
export class DashboardController {
  constructor(private readonly dashboards: DashboardService) {}

  @Get("reception")
  @RequirePermissions("APPOINTMENT_READ")
  reception(@Query() query: ReceptionDashboardQueryDto) {
    return this.dashboards.getReceptionDashboard(query);
  }

  @Get("doctor")
  @RequirePermissions("CLINICAL_NOTE_READ")
  doctor(@Query() query: DoctorDashboardQueryDto) {
    return this.dashboards.getDoctorDashboard(query);
  }

  @Get("nurse")
  @RequirePermissions("CLINICAL_NOTE_READ")
  nurse(@Query() query: NurseDashboardQueryDto) {
    return this.dashboards.getNurseDashboard(query);
  }

  @Get("admin-analytics")
  @RequirePermissions("AUDIT_READ")
  adminAnalytics(@Query() query: AdminAnalyticsQueryDto) {
    return this.dashboards.getAdminAnalytics(query);
  }
}
