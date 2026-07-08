import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { STAFF_REPOSITORY } from "./staff.constants.js";
import { CreateDoctorScheduleDto, CreateStaffProfileDto, UpdateStaffStatusDto } from "./dto/staff.dto.js";
import { StaffRepository } from "./staff.repository.js";

@Injectable()
export class StaffService {
  constructor(@Inject(STAFF_REPOSITORY) private readonly repository: StaffRepository) {}

  createProfile(dto: CreateStaffProfileDto) {
    return this.repository.createProfile(dto);
  }

  listProfiles(tenantId: string) {
    return this.repository.listProfiles(tenantId);
  }

  async updateStatus(staffId: string, dto: UpdateStaffStatusDto) {
    const staff = await this.repository.updateStatus(staffId, dto);
    if (!staff) {
      throw new NotFoundException("Staff profile not found.");
    }
    return staff;
  }

  createDoctorSchedule(dto: CreateDoctorScheduleDto) {
    return this.repository.createDoctorSchedule(dto);
  }

  listDoctorSchedules(tenantId: string, doctorUserId?: string) {
    return this.repository.listDoctorSchedules(tenantId, doctorUserId);
  }
}
