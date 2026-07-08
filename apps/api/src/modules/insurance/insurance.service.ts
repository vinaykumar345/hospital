import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { INSURANCE_REPOSITORY } from "./insurance.constants.js";
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
export class InsuranceService {
  constructor(@Inject(INSURANCE_REPOSITORY) private readonly repository: InsuranceRepository) {}

  createPolicy(dto: CreateInsurancePolicyDto) {
    return this.repository.createPolicy(dto);
  }

  listPolicies(query: InsuranceTenantQueryDto) {
    return this.repository.listPolicies(query);
  }

  async verifyPolicy(policyId: string, dto: VerifyInsuranceDto) {
    const policy = await this.repository.verifyPolicy(policyId, dto);
    if (!policy) throw new NotFoundException("Insurance policy not found.");
    return policy;
  }

  createClaim(dto: CreateClaimDto) {
    return this.repository.createClaim(dto);
  }

  listClaims(query: InsuranceTenantQueryDto) {
    return this.repository.listClaims(query);
  }

  uploadClaimDocument(claimId: string, dto: UploadClaimDocumentDto) {
    return this.repository.uploadClaimDocument(claimId, dto);
  }

  async updateClaimStatus(claimId: string, dto: UpdateClaimStatusDto) {
    const claim = await this.repository.updateClaimStatus(claimId, dto);
    if (!claim) throw new NotFoundException("Insurance claim not found.");
    return claim;
  }
}
