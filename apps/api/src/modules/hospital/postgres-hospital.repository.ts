import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import {
  CreateBedDto,
  CreateBranchDto,
  CreateDepartmentDto,
  CreateRoomDto,
  UpdateBedStatusDto,
  UpsertHospitalProfileDto
} from "./dto/hospital.dto.js";
import { HospitalRepository } from "./hospital.repository.js";

@Injectable()
export class PostgresHospitalRepository implements HospitalRepository {
  constructor(private readonly postgres: PostgresService) {}

  async upsertProfile(dto: UpsertHospitalProfileDto) {
    const result = await this.postgres.query(
      `insert into hospital_profiles (tenant_id, legal_name, registration_number, address_line1, timezone, phone)
       values ($1, $2, $3, $4, coalesce($5, 'UTC'), $6)
       on conflict (tenant_id) do update set
         legal_name = excluded.legal_name,
         registration_number = excluded.registration_number,
         address_line1 = excluded.address_line1,
         timezone = excluded.timezone,
         phone = excluded.phone,
         updated_at = now()
       returning *`,
      [dto.tenantId, dto.legalName, dto.registrationNumber ?? null, dto.addressLine1 ?? null, dto.timezone ?? null, dto.phone ?? null]
    );
    return result.rows[0];
  }

  async getProfile(tenantId: string) {
    const result = await this.postgres.query(`select * from hospital_profiles where tenant_id = $1`, [tenantId]);
    return result.rows[0] ?? null;
  }

  async createDepartment(dto: CreateDepartmentDto) {
    const result = await this.postgres.query(
      `insert into departments (tenant_id, name, description) values ($1, $2, $3) returning *`,
      [dto.tenantId, dto.name, dto.description ?? null]
    );
    return result.rows[0];
  }

  async listDepartments(tenantId: string) {
    const result = await this.postgres.query(`select * from departments where tenant_id = $1 order by name`, [tenantId]);
    return result.rows;
  }

  async createBranch(dto: CreateBranchDto) {
    const result = await this.postgres.query(
      `insert into branches (tenant_id, name, address_line1) values ($1, $2, $3) returning *`,
      [dto.tenantId, dto.name, dto.addressLine1]
    );
    return result.rows[0];
  }

  async listBranches(tenantId: string) {
    const result = await this.postgres.query(`select * from branches where tenant_id = $1 order by name`, [tenantId]);
    return result.rows;
  }

  async createRoom(dto: CreateRoomDto) {
    const result = await this.postgres.query(
      `insert into rooms (tenant_id, branch_id, name, type) values ($1, $2, $3, $4) returning *`,
      [dto.tenantId, dto.branchId, dto.name, dto.type]
    );
    return result.rows[0];
  }

  async listRooms(tenantId: string) {
    const result = await this.postgres.query(`select * from rooms where tenant_id = $1 order by name`, [tenantId]);
    return result.rows;
  }

  async createBed(dto: CreateBedDto) {
    const result = await this.postgres.query(
      `insert into beds (tenant_id, room_id, label) values ($1, $2, $3) returning *`,
      [dto.tenantId, dto.roomId, dto.label]
    );
    return result.rows[0];
  }

  async listBeds(tenantId: string) {
    const result = await this.postgres.query(`select * from beds where tenant_id = $1 order by label`, [tenantId]);
    return result.rows;
  }

  async updateBedStatus(bedId: string, dto: UpdateBedStatusDto) {
    const result = await this.postgres.query(
      `update beds set status = $3, updated_at = now() where id = $1 and tenant_id = $2 returning *`,
      [bedId, dto.tenantId, dto.status]
    );
    return result.rows[0] ?? null;
  }
}
