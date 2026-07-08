import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class PharmacyTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;
}

export class CreateMedicineDto extends PharmacyTenantQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  genericName?: string;
}

export class AddStockLotDto extends PharmacyTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  medicineId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  batchNumber!: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity!: number;

  @ApiProperty()
  @IsDateString()
  expiresOn!: string;
}

export class CreatePrescriptionDto extends PharmacyTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  patientId!: string;

  @ApiProperty()
  @IsUUID()
  prescribedByUserId!: string;
}

export class AddPrescriptionItemDto extends PharmacyTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  medicineId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dosage!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  frequency!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  duration!: string;
}

export class DispenseItemDto extends PharmacyTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  prescriptionItemId!: string;

  @ApiProperty()
  @IsUUID()
  stockLotId!: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class InteractionWarningDto extends PharmacyTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  prescriptionId!: string;

  @ApiProperty({ enum: ["LOW", "MODERATE", "HIGH"] })
  @IsIn(["LOW", "MODERATE", "HIGH"])
  severity!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message!: string;
}
