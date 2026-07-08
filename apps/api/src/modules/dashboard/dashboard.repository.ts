import { ReceptionDashboardQueryDto } from "./dto/dashboard.dto.js";

export interface DashboardRepository {
  getReceptionDashboard(query: ReceptionDashboardQueryDto): Promise<unknown>;
}
