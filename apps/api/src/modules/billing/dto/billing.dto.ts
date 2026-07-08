import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class BillingTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;
}

export class CreateInvoiceDto extends BillingTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  patientId!: string;
}

export class AddInvoiceLineDto extends BillingTenantQueryDto {
  @ApiProperty({ enum: ["CONSULTATION", "PROCEDURE", "LAB", "PHARMACY", "PACKAGE"] })
  @IsIn(["CONSULTATION", "PROCEDURE", "LAB", "PHARMACY", "PACKAGE"])
  lineType!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  amount!: number;

  @ApiProperty({ default: 0 })
  @IsNumber()
  @Min(0)
  gstRate!: number;

  @ApiProperty({ default: 0 })
  @IsNumber()
  @Min(0)
  discountAmount!: number;
}

export class RecordPaymentDto extends BillingTenantQueryDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  amount!: number;

  @ApiProperty({ enum: ["CASH", "CARD", "UPI", "BANK_TRANSFER", "PAYMENT_GATEWAY"] })
  @IsIn(["CASH", "CARD", "UPI", "BANK_TRANSFER", "PAYMENT_GATEWAY"])
  method!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  gatewayReference?: string;
}
