import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { LABORATORY_REPOSITORY } from "./laboratory.constants.js";
import { LaboratoryRepository } from "./laboratory.repository.js";
import { CreateLabOrderDto, CreateLabTestDto, EnterLabResultDto, LabTenantQueryDto, UpdateSampleStatusDto } from "./dto/laboratory.dto.js";

@Injectable()
export class LaboratoryService {
  constructor(@Inject(LABORATORY_REPOSITORY) private readonly repository: LaboratoryRepository) {}

  createTest(dto: CreateLabTestDto) {
    return this.repository.createTest(dto);
  }

  listTests(query: LabTenantQueryDto) {
    return this.repository.listTests(query);
  }

  createOrder(dto: CreateLabOrderDto) {
    return this.repository.createOrder(dto);
  }

  listOrders(query: LabTenantQueryDto) {
    return this.repository.listOrders(query);
  }

  async updateSampleStatus(sampleId: string, dto: UpdateSampleStatusDto) {
    const sample = await this.repository.updateSampleStatus(sampleId, dto);
    if (!sample) {
      throw new NotFoundException("Sample not found.");
    }
    return sample;
  }

  enterResult(orderId: string, dto: EnterLabResultDto) {
    return this.repository.enterResult(orderId, dto);
  }
}
