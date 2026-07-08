import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class TenantScopedDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;
}

export class UpsertHospitalProfileDto extends TenantScopedDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  legalName!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  addressLine1?: string;

  @ApiProperty({ required: false, default: "UTC" })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}

export class CreateDepartmentDto extends TenantScopedDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateBranchDto extends TenantScopedDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  addressLine1!: string;
}

export class CreateRoomDto extends TenantScopedDto {
  @ApiProperty()
  @IsUUID()
  branchId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ enum: ["CONSULTATION", "WARD", "ICU", "LAB", "PHARMACY", "PROCEDURE"] })
  @IsIn(["CONSULTATION", "WARD", "ICU", "LAB", "PHARMACY", "PROCEDURE"])
  type!: string;
}

export class CreateBedDto extends TenantScopedDto {
  @ApiProperty()
  @IsUUID()
  roomId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  label!: string;
}

export class UpdateBedStatusDto extends TenantScopedDto {
  @ApiProperty({ enum: ["AVAILABLE", "OCCUPIED", "CLEANING", "MAINTENANCE", "RESERVED"] })
  @IsIn(["AVAILABLE", "OCCUPIED", "CLEANING", "MAINTENANCE", "RESERVED"])
  status!: string;
}
