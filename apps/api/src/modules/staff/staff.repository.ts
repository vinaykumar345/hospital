import { CreateDoctorScheduleDto, CreateStaffProfileDto, UpdateStaffStatusDto } from "./dto/staff.dto.js";

export interface StaffRepository {
  createProfile(dto: CreateStaffProfileDto): Promise<unknown>;
  listProfiles(tenantId: string): Promise<unknown[]>;
  updateStatus(staffId: string, dto: UpdateStaffStatusDto): Promise<unknown>;
  createDoctorSchedule(dto: CreateDoctorScheduleDto): Promise<unknown>;
  listDoctorSchedules(tenantId: string, doctorUserId?: string): Promise<unknown[]>;
}
