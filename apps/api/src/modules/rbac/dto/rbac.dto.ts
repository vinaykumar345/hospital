import { ApiProperty } from "@nestjs/swagger";
import { PERMISSION_NAMES, ROLE_NAMES, PermissionName, RoleName } from "@hospital/shared";
import { IsIn, IsOptional, IsUUID } from "class-validator";

export class TenantQueryDto {
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsUUID()
  tenantId?: string;
}

export class RolePermissionDto {
  @ApiProperty({ enum: ROLE_NAMES })
  @IsIn(ROLE_NAMES)
  role!: RoleName;

  @ApiProperty({ enum: PERMISSION_NAMES })
  @IsIn(PERMISSION_NAMES)
  permission!: PermissionName;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsUUID()
  tenantId?: string;
}
