import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import { ConsentRecordDto, PatientRecordDto, PatientTenantQueryDto, RegisterPatientDto, VisitRecordDto } from "./dto/patient.dto.js";
import { PatientRepository } from "./patient.repository.js";

@Injectable()
export class PostgresPatientRepository implements PatientRepository {
  constructor(private readonly postgres: PostgresService) {}

  async register(dto: RegisterPatientDto) {
    const result = await this.postgres.query(
      `insert into patients (tenant_id, full_name, date_of_birth, sex, mobile, email)
       values ($1, $2, $3, $4, $5, lower($6))
       returning *`,
      [dto.tenantId, dto.fullName, dto.dateOfBirth ?? null, dto.sex, dto.mobile ?? null, dto.email ?? null]
    );
    return result.rows[0];
  }

  async list(query: PatientTenantQueryDto) {
    const result = await this.postgres.query(
      `select * from patients
       where tenant_id = $1 and ($2::text is null or full_name ilike '%' || $2 || '%' or mobile ilike '%' || $2 || '%')
       order by created_at desc
       limit 100`,
      [query.tenantId, query.search ?? null]
    );
    return result.rows;
  }

  async get(tenantId: string, patientId: string) {
    const result = await this.postgres.query(`select * from patients where tenant_id = $1 and id = $2`, [tenantId, patientId]);
    return result.rows[0] ?? null;
  }

  addAllergy(patientId: string, dto: PatientRecordDto) {
    return this.insertRecord("patient_allergies", patientId, dto);
  }

  addMedication(patientId: string, dto: PatientRecordDto) {
    return this.insertRecord("patient_medications", patientId, dto);
  }

  addEmergencyContact(patientId: string, dto: PatientRecordDto) {
    return this.insertRecord("patient_emergency_contacts", patientId, dto);
  }

  addInsurance(patientId: string, dto: PatientRecordDto) {
    return this.insertRecord("patient_insurance_details", patientId, dto);
  }

  async addConsent(patientId: string, dto: ConsentRecordDto) {
    const result = await this.postgres.query(
      `insert into patient_consents (tenant_id, patient_id, consent_type, label, value)
       values ($1, $2, $3, $4, $5) returning *`,
      [dto.tenantId, patientId, dto.consentType, dto.label, dto.value ?? null]
    );
    return result.rows[0];
  }

  async addVisit(patientId: string, dto: VisitRecordDto) {
    const result = await this.postgres.query(
      `insert into patient_visits (tenant_id, patient_id, visit_type, label, value)
       values ($1, $2, $3, $4, $5) returning *`,
      [dto.tenantId, patientId, dto.visitType, dto.label, dto.value ?? null]
    );
    return result.rows[0];
  }

  private async insertRecord(tableName: string, patientId: string, dto: PatientRecordDto) {
    const result = await this.postgres.query(
      `insert into ${tableName} (tenant_id, patient_id, label, value) values ($1, $2, $3, $4) returning *`,
      [dto.tenantId, patientId, dto.label, dto.value ?? null]
    );
    return result.rows[0];
  }
}
