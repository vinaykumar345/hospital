import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import {
  CreateClaimDto,
  CreateInsurancePolicyDto,
  InsuranceTenantQueryDto,
  UpdateClaimStatusDto,
  UploadClaimDocumentDto,
  VerifyInsuranceDto
} from "./dto/insurance.dto.js";
import { InsuranceRepository } from "./insurance.repository.js";

@Injectable()
export class PostgresInsuranceRepository implements InsuranceRepository {
  constructor(private readonly postgres: PostgresService) {}

  async createPolicy(dto: CreateInsurancePolicyDto) {
    const result = await this.postgres.query(
      `insert into insurance_policies (tenant_id, patient_id, provider_name, policy_number)
       values ($1, $2, $3, $4) returning *`,
      [dto.tenantId, dto.patientId, dto.providerName, dto.policyNumber]
    );
    return result.rows[0];
  }

  async listPolicies(query: InsuranceTenantQueryDto) {
    const result = await this.postgres.query(
      `select ip.*, p.full_name as patient_name
       from insurance_policies ip
       join patients p on p.id = ip.patient_id
       where ip.tenant_id = $1
       order by ip.created_at desc`,
      [query.tenantId]
    );
    return result.rows;
  }

  async verifyPolicy(policyId: string, dto: VerifyInsuranceDto) {
    const result = await this.postgres.query(
      `update insurance_policies
       set verification_status = $3, verification_notes = $4, verified_at = case when $3 = 'VERIFIED' then now() else verified_at end, updated_at = now()
       where id = $1 and tenant_id = $2 returning *`,
      [policyId, dto.tenantId, dto.verificationStatus, dto.notes ?? null]
    );
    return result.rows[0] ?? null;
  }

  async createClaim(dto: CreateClaimDto) {
    const result = await this.postgres.query(
      `insert into insurance_claims (tenant_id, policy_id, invoice_id) values ($1, $2, $3) returning *`,
      [dto.tenantId, dto.policyId, dto.invoiceId]
    );
    return result.rows[0];
  }

  async listClaims(query: InsuranceTenantQueryDto) {
    const result = await this.postgres.query(
      `select ic.*, ip.provider_name
       from insurance_claims ic
       join insurance_policies ip on ip.id = ic.policy_id
       where ic.tenant_id = $1
       order by ic.created_at desc`,
      [query.tenantId]
    );
    return result.rows;
  }

  async uploadClaimDocument(claimId: string, dto: UploadClaimDocumentDto) {
    const result = await this.postgres.query(
      `insert into insurance_claim_documents (tenant_id, claim_id, document_type, s3_key)
       values ($1, $2, $3, $4) returning *`,
      [dto.tenantId, claimId, dto.documentType, dto.s3Key]
    );
    return result.rows[0];
  }

  async updateClaimStatus(claimId: string, dto: UpdateClaimStatusDto) {
    const result = await this.postgres.query(
      `update insurance_claims set status = $3, updated_at = now() where id = $1 and tenant_id = $2 returning *`,
      [claimId, dto.tenantId, dto.status]
    );
    return result.rows[0] ?? null;
  }
}
