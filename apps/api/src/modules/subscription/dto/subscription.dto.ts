import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateSubscriptionPlanDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  monthlyPrice!: number;
}

export class TenantSubscriptionDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty()
  @IsUUID()
  planId!: string;

  @ApiProperty({ enum: ["MONTHLY", "ANNUAL"] })
  @IsIn(["MONTHLY", "ANNUAL"])
  billingInterval!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  providerCustomerId?: string;
}

export class UpdateSubscriptionStatusDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty({ enum: ["TRIALING", "ACTIVE", "PAST_DUE", "CANCELLED", "SUSPENDED"] })
  @IsIn(["TRIALING", "ACTIVE", "PAST_DUE", "CANCELLED", "SUSPENDED"])
  status!: string;
}
