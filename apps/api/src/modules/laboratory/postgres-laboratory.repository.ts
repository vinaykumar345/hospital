import { Injectable } from "@nestjs/common";
import { AI_REVIEW_DISCLAIMER } from "@hospital/shared";
import { PostgresService } from "../../common/database/postgres.service.js";
import { CreateLabOrderDto, CreateLabTestDto, EnterLabResultDto, LabTenantQueryDto, UpdateSampleStatusDto } from "./dto/laboratory.dto.js";
import { LaboratoryRepository } from "./laboratory.repository.js";

@Injectable()
export class PostgresLaboratoryRepository implements LaboratoryRepository {
  constructor(private readonly postgres: PostgresService) {}

  async createTest(dto: CreateLabTestDto) {
    const result = await this.postgres.query(
      `insert into lab_tests (tenant_id, code, name, specimen_type) values ($1, upper($2), $3, $4) returning *`,
      [dto.tenantId, dto.code, dto.name, dto.specimenType ?? null]
    );
    return result.rows[0];
  }

  async listTests(query: LabTenantQueryDto) {
    const result = await this.postgres.query(`select * from lab_tests where tenant_id = $1 order by name`, [query.tenantId]);
    return result.rows;
  }

  async createOrder(dto: CreateLabOrderDto) {
    const order = await this.postgres.query(
      `insert into lab_orders (tenant_id, patient_id, ordered_by_user_id, lab_test_id)
       values ($1, $2, $3, $4) returning *`,
      [dto.tenantId, dto.patientId, dto.orderedByUserId, dto.labTestId]
    );
    await this.postgres.query(
      `insert into lab_samples (tenant_id, lab_order_id, status) values ($1, $2, 'ORDERED')`,
      [dto.tenantId, order.rows[0].id]
    );
    return order.rows[0];
  }

  async listOrders(query: LabTenantQueryDto) {
    const result = await this.postgres.query(
      `select lo.*, lt.name as test_name, p.full_name as patient_name
       from lab_orders lo
       join lab_tests lt on lt.id = lo.lab_test_id
       join patients p on p.id = lo.patient_id
       where lo.tenant_id = $1
       order by lo.created_at desc
       limit 200`,
      [query.tenantId]
    );
    return result.rows;
  }

  async updateSampleStatus(sampleId: string, dto: UpdateSampleStatusDto) {
    const result = await this.postgres.query(
      `update lab_samples set status = $3, updated_at = now() where id = $1 and tenant_id = $2 returning *`,
      [sampleId, dto.tenantId, dto.status]
    );
    return result.rows[0] ?? null;
  }

  async enterResult(orderId: string, dto: EnterLabResultDto) {
    const result = await this.postgres.query(
      `insert into lab_results (tenant_id, lab_order_id, result_value, reference_range, interpretation)
       values ($1, $2, $3, $4, $5) returning *`,
      [dto.tenantId, orderId, dto.resultValue, dto.referenceRange ?? null, dto.interpretation]
    );

    if (dto.interpretation === "CRITICAL") {
      await this.postgres.query(
        `insert into lab_critical_alerts (tenant_id, lab_result_id, severity, message)
         values ($1, $2, 'CRITICAL', 'Critical lab value requires immediate clinical review.')`,
        [dto.tenantId, result.rows[0].id]
      );
    }

    await this.postgres.query(
      `insert into lab_result_summary_requests (tenant_id, lab_result_id, disclaimer)
       values ($1, $2, $3)`,
      [dto.tenantId, result.rows[0].id, AI_REVIEW_DISCLAIMER]
    );

    return result.rows[0];
  }
}
