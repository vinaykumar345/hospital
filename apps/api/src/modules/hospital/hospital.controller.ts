import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import {
  CreateBedDto,
  CreateBranchDto,
  CreateDepartmentDto,
  CreateRoomDto,
  TenantScopedDto,
  UpdateBedStatusDto,
  UpsertHospitalProfileDto
} from "./dto/hospital.dto.js";
import { HospitalService } from "./hospital.service.js";

@ApiTags("hospital-management")
@Controller("hospital")
@UseGuards(RbacGuard)
export class HospitalController {
  constructor(private readonly hospital: HospitalService) {}

  @Get("profile")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  getProfile(@Query() query: TenantScopedDto) {
    return this.hospital.getProfile(query.tenantId);
  }

  @Post("profile")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  upsertProfile(@Body() dto: UpsertHospitalProfileDto) {
    return this.hospital.upsertProfile(dto);
  }

  @Get("departments")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  listDepartments(@Query() query: TenantScopedDto) {
    return this.hospital.listDepartments(query.tenantId);
  }

  @Post("departments")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  createDepartment(@Body() dto: CreateDepartmentDto) {
    return this.hospital.createDepartment(dto);
  }

  @Get("branches")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  listBranches(@Query() query: TenantScopedDto) {
    return this.hospital.listBranches(query.tenantId);
  }

  @Post("branches")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  createBranch(@Body() dto: CreateBranchDto) {
    return this.hospital.createBranch(dto);
  }

  @Get("rooms")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  listRooms(@Query() query: TenantScopedDto) {
    return this.hospital.listRooms(query.tenantId);
  }

  @Post("rooms")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  createRoom(@Body() dto: CreateRoomDto) {
    return this.hospital.createRoom(dto);
  }

  @Get("beds")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  listBeds(@Query() query: TenantScopedDto) {
    return this.hospital.listBeds(query.tenantId);
  }

  @Post("beds")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  createBed(@Body() dto: CreateBedDto) {
    return this.hospital.createBed(dto);
  }

  @Patch("beds/:bedId/status")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  updateBedStatus(@Param("bedId") bedId: string, @Body() dto: UpdateBedStatusDto) {
    return this.hospital.updateBedStatus(bedId, dto);
  }
}
