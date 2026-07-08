import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class ReceptionAgentRequestDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  patientId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message!: string;
}

export class ReceptionAgentActionDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty()
  @IsUUID()
  interactionId!: string;

  @ApiProperty({ enum: ["BOOK_APPOINTMENT", "ROUTE_DEPARTMENT", "QUEUE_UPDATE", "FAQ_RESPONSE"] })
  @IsIn(["BOOK_APPOINTMENT", "ROUTE_DEPARTMENT", "QUEUE_UPDATE", "FAQ_RESPONSE"])
  actionType!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  payloadJson!: string;
}
