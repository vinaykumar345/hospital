import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import {
  CreateClaimDto,
  CreateInsurancePolicyDto,
  InsuranceTenantQueryDto,
  UpdateClaimStatusDto,
  UploadClaimDocumentDto,
  VerifyInsuranceDto
} from "./dto/insurance.dto.js";
import { InsuranceService } from "./insurance.service.js";

@ApiTags("insurance")
@Controller("insurance")
@UseGuards(RbacGuard)
export class InsuranceController {
  constructor(private readonly insurance: InsuranceService) {}

  @Get("policies")
  @RequirePermissions("INSURANCE_MANAGE")
  listPolicies(@Query() query: InsuranceTenantQueryDto) {
    return this.insurance.listPolicies(query);
  }

  @Post("policies")
  @RequirePermissions("INSURANCE_MANAGE")
  createPolicy(@Body() dto: CreateInsurancePolicyDto) {
    return this.insurance.createPolicy(dto);
  }

  @Patch("policies/:policyId/verification")
  @RequirePermissions("INSURANCE_MANAGE")
  verifyPolicy(@Param("policyId") policyId: string, @Body() dto: VerifyInsuranceDto) {
    return this.insurance.verifyPolicy(policyId, dto);
  }

  @Get("claims")
  @RequirePermissions("INSURANCE_MANAGE")
  listClaims(@Query() query: InsuranceTenantQueryDto) {
    return this.insurance.listClaims(query);
  }

  @Post("claims")
  @RequirePermissions("INSURANCE_MANAGE")
  createClaim(@Body() dto: CreateClaimDto) {
    return this.insurance.createClaim(dto);
  }

  @Post("claims/:claimId/documents")
  @RequirePermissions("INSURANCE_MANAGE")
  uploadClaimDocument(@Param("claimId") claimId: string, @Body() dto: UploadClaimDocumentDto) {
    return this.insurance.uploadClaimDocument(claimId, dto);
  }

  @Patch("claims/:claimId/status")
  @RequirePermissions("INSURANCE_MANAGE")
  updateClaimStatus(@Param("claimId") claimId: string, @Body() dto: UpdateClaimStatusDto) {
    return this.insurance.updateClaimStatus(claimId, dto);
  }
}
