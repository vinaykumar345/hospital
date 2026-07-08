import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import { AppointmentQueryDto, BookAppointmentDto, QueueActionDto, UpdateAppointmentStatusDto } from "./dto/appointment.dto.js";
import { AppointmentRepository } from "./appointment.repository.js";

@Injectable()
export class PostgresAppointmentRepository implements AppointmentRepository {
  constructor(private readonly postgres: PostgresService) {}

  async book(dto: BookAppointmentDto) {
    const result = await this.postgres.query(
      `insert into appointments
        (tenant_id, patient_id, doctor_user_id, branch_id, department_id, starts_at, source, reason)
       values ($1, $2, $3, $4, $5, $6::timestamptz, $7, $8)
       returning *`,
      [
        dto.tenantId,
        dto.patientId,
        dto.doctorUserId,
        dto.branchId ?? null,
        dto.departmentId ?? null,
        dto.startsAt,
        dto.source,
        dto.reason ?? null
      ]
    );
    await this.postgres.query(
      `insert into appointment_reminders (tenant_id, appointment_id, reminder_type, scheduled_for)
       values ($1, $2, 'APPOINTMENT_CONFIRMATION', now())`,
      [dto.tenantId, result.rows[0].id]
    );
    return result.rows[0];
  }

  async list(query: AppointmentQueryDto) {
    const result = await this.postgres.query(
      `select * from appointments
       where tenant_id = $1
         and ($2::date is null or starts_at::date = $2::date)
         and ($3::uuid is null or doctor_user_id = $3::uuid)
       order by starts_at asc
       limit 200`,
      [query.tenantId, query.date ?? null, query.doctorUserId ?? null]
    );
    return result.rows;
  }

  async updateStatus(appointmentId: string, dto: UpdateAppointmentStatusDto) {
    const result = await this.postgres.query(
      `update appointments set status = $3, updated_at = now() where id = $1 and tenant_id = $2 returning *`,
      [appointmentId, dto.tenantId, dto.status]
    );
    return result.rows[0] ?? null;
  }

  async enqueue(appointmentId: string, dto: QueueActionDto) {
    const result = await this.postgres.query(
      `insert into appointment_queue (tenant_id, appointment_id, queue_status)
       values ($1, $2, $3)
       on conflict (appointment_id) do update set queue_status = excluded.queue_status, updated_at = now()
       returning *`,
      [dto.tenantId, appointmentId, dto.queueStatus]
    );
    return result.rows[0];
  }

  async updateQueue(appointmentId: string, dto: QueueActionDto) {
    const result = await this.postgres.query(
      `update appointment_queue set queue_status = $3, updated_at = now()
       where appointment_id = $1 and tenant_id = $2 returning *`,
      [appointmentId, dto.tenantId, dto.queueStatus]
    );
    return result.rows[0] ?? null;
  }
}
