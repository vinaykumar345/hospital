import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import { RoleName, ROLE_NAMES } from "@hospital/shared";

export class CreateStaffProfileDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty()
  @IsUUID()
  userId!: string;

  @ApiProperty({ enum: ROLE_NAMES })
  @IsIn(ROLE_NAMES)
  role!: RoleName;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  departmentId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  branchId?: string;
}

export class StaffTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;
}

export class UpdateStaffStatusDto extends StaffTenantQueryDto {
  @ApiProperty({ enum: ["ACTIVE", "ON_LEAVE", "SUSPENDED", "OFFBOARDED"] })
  @IsIn(["ACTIVE", "ON_LEAVE", "SUSPENDED", "OFFBOARDED"])
  status!: string;
}

export class CreateDoctorScheduleDto extends StaffTenantQueryDto {
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

  @ApiProperty({ minimum: 0, maximum: 6 })
  @IsInt()
  @Min(0)
  @Max(6)
  weekday!: number;

  @ApiProperty({ example: "09:00" })
  @IsString()
  startTime!: string;

  @ApiProperty({ example: "17:00" })
  @IsString()
  endTime!: string;

  @ApiProperty({ default: 15 })
  @IsInt()
  @Min(5)
  @Max(120)
  slotMinutes!: number;
}
