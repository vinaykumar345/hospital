import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsUUID } from "class-validator";

export class ReceptionDashboardQueryDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  date?: string;
}

export class DoctorDashboardQueryDto extends ReceptionDashboardQueryDto {
  @ApiProperty()
  @IsUUID()
  doctorUserId!: string;
}

export class NurseDashboardQueryDto extends ReceptionDashboardQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  nurseUserId?: string;
}

export class AdminAnalyticsQueryDto extends ReceptionDashboardQueryDto {}
