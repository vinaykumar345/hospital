import { CreateLabOrderDto, CreateLabTestDto, EnterLabResultDto, LabTenantQueryDto, UpdateSampleStatusDto } from "./dto/laboratory.dto.js";

export interface LaboratoryRepository {
  createTest(dto: CreateLabTestDto): Promise<unknown>;
  listTests(query: LabTenantQueryDto): Promise<unknown[]>;
  createOrder(dto: CreateLabOrderDto): Promise<unknown>;
  listOrders(query: LabTenantQueryDto): Promise<unknown[]>;
  updateSampleStatus(sampleId: string, dto: UpdateSampleStatusDto): Promise<unknown>;
  enterResult(orderId: string, dto: EnterLabResultDto): Promise<unknown>;
}
