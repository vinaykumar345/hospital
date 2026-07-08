import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import { CreateDoctorScheduleDto, CreateStaffProfileDto, UpdateStaffStatusDto } from "./dto/staff.dto.js";
import { StaffRepository } from "./staff.repository.js";

@Injectable()
export class PostgresStaffRepository implements StaffRepository {
  constructor(private readonly postgres: PostgresService) {}

  async createProfile(dto: CreateStaffProfileDto) {
    const result = await this.postgres.query(
      `insert into staff_profiles
        (tenant_id, user_id, role, full_name, email, job_title, license_number, department_id, branch_id)
       values ($1, $2, $3, $4, lower($5), $6, $7, $8, $9)
       returning *`,
      [
        dto.tenantId,
        dto.userId,
        dto.role,
        dto.fullName,
        dto.email,
        dto.jobTitle ?? null,
        dto.licenseNumber ?? null,
        dto.departmentId ?? null,
        dto.branchId ?? null
      ]
    );
    return result.rows[0];
  }

  async listProfiles(tenantId: string) {
    const result = await this.postgres.query(`select * from staff_profiles where tenant_id = $1 order by full_name`, [tenantId]);
    return result.rows;
  }

  async updateStatus(staffId: string, dto: UpdateStaffStatusDto) {
    const result = await this.postgres.query(
      `update staff_profiles set status = $3, updated_at = now() where id = $1 and tenant_id = $2 returning *`,
      [staffId, dto.tenantId, dto.status]
    );
    return result.rows[0] ?? null;
  }

  async createDoctorSchedule(dto: CreateDoctorScheduleDto) {
    const result = await this.postgres.query(
      `insert into doctor_schedules
        (tenant_id, doctor_user_id, branch_id, department_id, weekday, start_time, end_time, slot_minutes)
       values ($1, $2, $3, $4, $5, $6::time, $7::time, $8)
       returning *`,
      [
        dto.tenantId,
        dto.doctorUserId,
        dto.branchId ?? null,
        dto.departmentId ?? null,
        dto.weekday,
        dto.startTime,
        dto.endTime,
        dto.slotMinutes
      ]
    );
    return result.rows[0];
  }

  async listDoctorSchedules(tenantId: string, doctorUserId?: string) {
    const result = await this.postgres.query(
      `select * from doctor_schedules
       where tenant_id = $1 and ($2::uuid is null or doctor_user_id = $2::uuid)
       order by weekday, start_time`,
      [tenantId, doctorUserId ?? null]
    );
    return result.rows;
  }
}
