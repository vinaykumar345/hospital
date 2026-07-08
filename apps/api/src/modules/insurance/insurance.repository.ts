import {
  CreateClaimDto,
  CreateInsurancePolicyDto,
  InsuranceTenantQueryDto,
  UpdateClaimStatusDto,
  UploadClaimDocumentDto,
  VerifyInsuranceDto
} from "./dto/insurance.dto.js";

export interface InsuranceRepository {
  createPolicy(dto: CreateInsurancePolicyDto): Promise<unknown>;
  listPolicies(query: InsuranceTenantQueryDto): Promise<unknown[]>;
  verifyPolicy(policyId: string, dto: VerifyInsuranceDto): Promise<unknown>;
  createClaim(dto: CreateClaimDto): Promise<unknown>;
  listClaims(query: InsuranceTenantQueryDto): Promise<unknown[]>;
  uploadClaimDocument(claimId: string, dto: UploadClaimDocumentDto): Promise<unknown>;
  updateClaimStatus(claimId: string, dto: UpdateClaimStatusDto): Promise<unknown>;
}
