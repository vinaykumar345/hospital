import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import { ReceptionDashboardQueryDto } from "./dto/dashboard.dto.js";
import { DashboardRepository } from "./dashboard.repository.js";

@Injectable()
export class PostgresDashboardRepository implements DashboardRepository {
  constructor(private readonly postgres: PostgresService) {}

  async getReceptionDashboard(query: ReceptionDashboardQueryDto) {
    const result = await this.postgres.query(
      `select
        count(*) filter (where a.starts_at::date = coalesce($2::date, current_date)) as todays_appointments,
        count(*) filter (where a.source = 'WALK_IN' and a.starts_at::date = coalesce($2::date, current_date)) as walk_ins,
        count(*) filter (where aq.queue_status = 'WAITING') as waiting,
        count(*) filter (where aq.queue_status = 'CALLED') as called,
        count(*) filter (where a.status = 'CHECKED_IN') as checked_in,
        count(*) filter (where a.status = 'CANCELLED') as cancellations
       from appointments a
       left join appointment_queue aq on aq.appointment_id = a.id
       where a.tenant_id = $1`,
      [query.tenantId, query.date ?? null]
    );

    const upcoming = await this.postgres.query(
      `select a.id, a.starts_at, a.status, a.source, p.full_name as patient_name
       from appointments a
       join patients p on p.id = a.patient_id
       where a.tenant_id = $1 and a.starts_at >= now()
       order by a.starts_at asc
       limit 10`,
      [query.tenantId]
    );

    return {
      metrics: result.rows[0],
      upcomingAppointments: upcoming.rows
    };
  }
}
