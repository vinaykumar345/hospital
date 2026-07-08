import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsIn, IsOptional, IsString, IsUUID } from "class-validator";

export class AppointmentQueryDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  doctorUserId?: string;
}

export class BookAppointmentDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty()
  @IsUUID()
  patientId!: string;

  @ApiProperty()
  @IsUUID()
  doctorUserId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  branchId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  departmentId?: string;

  @ApiProperty()
  @IsDateString()
  startsAt!: string;

  @ApiProperty({ enum: ["ONLINE", "WALK_IN", "TELECONSULTATION"] })
  @IsIn(["ONLINE", "WALK_IN", "TELECONSULTATION"])
  source!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class UpdateAppointmentStatusDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty({ enum: ["BOOKED", "CHECKED_IN", "IN_CONSULTATION", "COMPLETED", "CANCELLED", "NO_SHOW"] })
  @IsIn(["BOOKED", "CHECKED_IN", "IN_CONSULTATION", "COMPLETED", "CANCELLED", "NO_SHOW"])
  status!: string;
}

export class QueueActionDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty({ enum: ["WAITING", "CALLED", "IN_SERVICE", "DONE", "SKIPPED"] })
  @IsIn(["WAITING", "CALLED", "IN_SERVICE", "DONE", "SKIPPED"])
  queueStatus!: string;
}
