import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import { CreateDoctorScheduleDto, CreateStaffProfileDto, StaffTenantQueryDto, UpdateStaffStatusDto } from "./dto/staff.dto.js";
import { StaffService } from "./staff.service.js";

@ApiTags("staff-management")
@Controller("staff")
@UseGuards(RbacGuard)
export class StaffController {
  constructor(private readonly staff: StaffService) {}

  @Get()
  @RequirePermissions("USER_MANAGE")
  listProfiles(@Query() query: StaffTenantQueryDto) {
    return this.staff.listProfiles(query.tenantId);
  }

  @Post()
  @RequirePermissions("USER_MANAGE")
  createProfile(@Body() dto: CreateStaffProfileDto) {
    return this.staff.createProfile(dto);
  }

  @Patch(":staffId/status")
  @RequirePermissions("USER_MANAGE")
  updateStatus(@Param("staffId") staffId: string, @Body() dto: UpdateStaffStatusDto) {
    return this.staff.updateStatus(staffId, dto);
  }

  @Get("doctor-schedules")
  @RequirePermissions("USER_MANAGE")
  listDoctorSchedules(@Query("tenantId") tenantId: string, @Query("doctorUserId") doctorUserId?: string) {
    return this.staff.listDoctorSchedules(tenantId, doctorUserId);
  }

  @Post("doctor-schedules")
  @RequirePermissions("USER_MANAGE")
  createDoctorSchedule(@Body() dto: CreateDoctorScheduleDto) {
    return this.staff.createDoctorSchedule(dto);
  }
}
