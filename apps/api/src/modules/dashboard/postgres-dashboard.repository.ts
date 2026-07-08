import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import { DoctorDashboardQueryDto, ReceptionDashboardQueryDto } from "./dto/dashboard.dto.js";
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

  async getDoctorDashboard(query: DoctorDashboardQueryDto) {
    const appointments = await this.postgres.query(
      `select a.id, a.starts_at, a.status, a.source, p.id as patient_id, p.full_name as patient_name
       from appointments a
       join patients p on p.id = a.patient_id
       where a.tenant_id = $1
         and a.doctor_user_id = $2
         and a.starts_at::date = coalesce($3::date, current_date)
       order by a.starts_at asc`,
      [query.tenantId, query.doctorUserId, query.date ?? null]
    );

    const tasks = await this.postgres.query(
      `select task_type, count(*) as count
       from doctor_dashboard_tasks
       where tenant_id = $1 and doctor_user_id = $2 and status = 'OPEN'
       group by task_type`,
      [query.tenantId, query.doctorUserId]
    );

    const followUps = await this.postgres.query(
      `select id, patient_id, label, due_at
       from doctor_dashboard_tasks
       where tenant_id = $1 and doctor_user_id = $2 and task_type = 'FOLLOW_UP' and status = 'OPEN'
       order by due_at asc nulls last
       limit 10`,
      [query.tenantId, query.doctorUserId]
    );

    return {
      todaysAppointments: appointments.rows,
      openTaskCounts: tasks.rows,
      followUps: followUps.rows
    };
  }
}
