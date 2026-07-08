import { AdminAnalyticsQueryDto, DoctorDashboardQueryDto, NurseDashboardQueryDto, ReceptionDashboardQueryDto } from "./dto/dashboard.dto.js";

export interface DashboardRepository {
  getReceptionDashboard(query: ReceptionDashboardQueryDto): Promise<unknown>;
  getDoctorDashboard(query: DoctorDashboardQueryDto): Promise<unknown>;
  getNurseDashboard(query: NurseDashboardQueryDto): Promise<unknown>;
  getAdminAnalytics(query: AdminAnalyticsQueryDto): Promise<unknown>;
}
