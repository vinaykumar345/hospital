import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class LabTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;
}

export class CreateLabTestDto extends LabTenantQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  specimenType?: string;
}

export class CreateLabOrderDto extends LabTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  patientId!: string;

  @ApiProperty()
  @IsUUID()
  orderedByUserId!: string;

  @ApiProperty()
  @IsUUID()
  labTestId!: string;
}

export class UpdateSampleStatusDto extends LabTenantQueryDto {
  @ApiProperty({ enum: ["ORDERED", "COLLECTED", "IN_TRANSIT", "RECEIVED", "PROCESSING", "REJECTED"] })
  @IsIn(["ORDERED", "COLLECTED", "IN_TRANSIT", "RECEIVED", "PROCESSING", "REJECTED"])
  status!: string;
}

export class EnterLabResultDto extends LabTenantQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  resultValue!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  referenceRange?: string;

  @ApiProperty({ enum: ["NORMAL", "ABNORMAL", "CRITICAL"] })
  @IsIn(["NORMAL", "ABNORMAL", "CRITICAL"])
  interpretation!: string;
}
