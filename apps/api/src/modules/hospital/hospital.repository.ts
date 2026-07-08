import {
  CreateBedDto,
  CreateBranchDto,
  CreateDepartmentDto,
  CreateRoomDto,
  UpdateBedStatusDto,
  UpsertHospitalProfileDto
} from "./dto/hospital.dto.js";

export interface HospitalRepository {
  upsertProfile(dto: UpsertHospitalProfileDto): Promise<unknown>;
  getProfile(tenantId: string): Promise<unknown>;
  createDepartment(dto: CreateDepartmentDto): Promise<unknown>;
  listDepartments(tenantId: string): Promise<unknown[]>;
  createBranch(dto: CreateBranchDto): Promise<unknown>;
  listBranches(tenantId: string): Promise<unknown[]>;
  createRoom(dto: CreateRoomDto): Promise<unknown>;
  listRooms(tenantId: string): Promise<unknown[]>;
  createBed(dto: CreateBedDto): Promise<unknown>;
  listBeds(tenantId: string): Promise<unknown[]>;
  updateBedStatus(bedId: string, dto: UpdateBedStatusDto): Promise<unknown>;
}
