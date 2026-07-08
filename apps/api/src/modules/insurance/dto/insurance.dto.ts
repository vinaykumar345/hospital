import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class InsuranceTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;
}

export class CreateInsurancePolicyDto extends InsuranceTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  patientId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  providerName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  policyNumber!: string;
}

export class VerifyInsuranceDto extends InsuranceTenantQueryDto {
  @ApiProperty({ enum: ["PENDING", "VERIFIED", "REJECTED"] })
  @IsIn(["PENDING", "VERIFIED", "REJECTED"])
  verificationStatus!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateClaimDto extends InsuranceTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  policyId!: string;

  @ApiProperty()
  @IsUUID()
  invoiceId!: string;
}

export class UploadClaimDocumentDto extends InsuranceTenantQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  documentType!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  s3Key!: string;
}

export class UpdateClaimStatusDto extends InsuranceTenantQueryDto {
  @ApiProperty({ enum: ["PREPARING", "SUBMITTED", "IN_REVIEW", "APPROVED", "REJECTED", "PAID"] })
  @IsIn(["PREPARING", "SUBMITTED", "IN_REVIEW", "APPROVED", "REJECTED", "PAID"])
  status!: string;
}
