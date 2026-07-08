import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class NotificationTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;
}

export class CreateTemplateDto extends NotificationTenantQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ enum: ["EMAIL", "SMS", "PUSH", "WHATSAPP"] })
  @IsIn(["EMAIL", "SMS", "PUSH", "WHATSAPP"])
  channel!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body!: string;
}

export class QueueNotificationDto extends NotificationTenantQueryDto {
  @ApiProperty({ enum: ["EMAIL", "SMS", "PUSH", "WHATSAPP"] })
  @IsIn(["EMAIL", "SMS", "PUSH", "WHATSAPP"])
  channel!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  recipient!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  templateCode!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  payloadJson?: string;
}

export class UpdatePreferenceDto extends NotificationTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  userId!: string;

  @ApiProperty({ enum: ["EMAIL", "SMS", "PUSH", "WHATSAPP"] })
  @IsIn(["EMAIL", "SMS", "PUSH", "WHATSAPP"])
  channel!: string;

  @ApiProperty({ enum: ["ENABLED", "DISABLED"] })
  @IsIn(["ENABLED", "DISABLED"])
  status!: string;
}
