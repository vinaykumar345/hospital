import { Inject, Injectable } from "@nestjs/common";
import { DASHBOARD_REPOSITORY } from "./dashboard.constants.js";
import { DashboardRepository } from "./dashboard.repository.js";
import { DoctorDashboardQueryDto, NurseDashboardQueryDto, ReceptionDashboardQueryDto } from "./dto/dashboard.dto.js";

@Injectable()
export class DashboardService {
  constructor(@Inject(DASHBOARD_REPOSITORY) private readonly repository: DashboardRepository) {}

  getReceptionDashboard(query: ReceptionDashboardQueryDto) {
    return this.repository.getReceptionDashboard(query);
  }

  getDoctorDashboard(query: DoctorDashboardQueryDto) {
    return this.repository.getDoctorDashboard(query);
  }

  getNurseDashboard(query: NurseDashboardQueryDto) {
    return this.repository.getNurseDashboard(query);
  }
}
