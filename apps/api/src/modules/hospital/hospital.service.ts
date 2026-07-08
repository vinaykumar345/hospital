import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { HOSPITAL_REPOSITORY } from "./hospital.constants.js";
import {
  CreateBedDto,
  CreateBranchDto,
  CreateDepartmentDto,
  CreateRoomDto,
  UpdateBedStatusDto,
  UpsertHospitalProfileDto
} from "./dto/hospital.dto.js";
import { HospitalRepository } from "./hospital.repository.js";

@Injectable()
export class HospitalService {
  constructor(@Inject(HOSPITAL_REPOSITORY) private readonly repository: HospitalRepository) {}

  upsertProfile(dto: UpsertHospitalProfileDto) {
    return this.repository.upsertProfile(dto);
  }

  getProfile(tenantId: string) {
    return this.repository.getProfile(tenantId);
  }

  createDepartment(dto: CreateDepartmentDto) {
    return this.repository.createDepartment(dto);
  }

  listDepartments(tenantId: string) {
    return this.repository.listDepartments(tenantId);
  }

  createBranch(dto: CreateBranchDto) {
    return this.repository.createBranch(dto);
  }

  listBranches(tenantId: string) {
    return this.repository.listBranches(tenantId);
  }

  createRoom(dto: CreateRoomDto) {
    return this.repository.createRoom(dto);
  }

  listRooms(tenantId: string) {
    return this.repository.listRooms(tenantId);
  }

  createBed(dto: CreateBedDto) {
    return this.repository.createBed(dto);
  }

  listBeds(tenantId: string) {
    return this.repository.listBeds(tenantId);
  }

  async updateBedStatus(bedId: string, dto: UpdateBedStatusDto) {
    const bed = await this.repository.updateBedStatus(bedId, dto);
    if (!bed) {
      throw new NotFoundException("Bed not found.");
    }
    return bed;
  }
}
