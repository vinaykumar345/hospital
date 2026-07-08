import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class PatientTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;
}

export class RegisterPatientDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({ enum: ["FEMALE", "MALE", "OTHER", "UNKNOWN"] })
  @IsIn(["FEMALE", "MALE", "OTHER", "UNKNOWN"])
  sex!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mobile?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class PatientRecordDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  label!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  value?: string;
}

export class ConsentRecordDto extends PatientRecordDto {
  @ApiProperty({ enum: ["TREATMENT", "TELEMEDICINE", "DATA_SHARING", "INSURANCE"] })
  @IsIn(["TREATMENT", "TELEMEDICINE", "DATA_SHARING", "INSURANCE"])
  consentType!: string;
}

export class VisitRecordDto extends PatientRecordDto {
  @ApiProperty({ enum: ["OPD", "IPD", "EMERGENCY", "TELECONSULTATION"] })
  @IsIn(["OPD", "IPD", "EMERGENCY", "TELECONSULTATION"])
  visitType!: string;
}
