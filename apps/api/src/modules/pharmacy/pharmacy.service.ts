import { Inject, Injectable } from "@nestjs/common";
import { PHARMACY_REPOSITORY } from "./pharmacy.constants.js";
import {
  AddPrescriptionItemDto,
  AddStockLotDto,
  CreateMedicineDto,
  CreatePrescriptionDto,
  DispenseItemDto,
  InteractionWarningDto,
  PharmacyTenantQueryDto
} from "./dto/pharmacy.dto.js";
import { PharmacyRepository } from "./pharmacy.repository.js";

@Injectable()
export class PharmacyService {
  constructor(@Inject(PHARMACY_REPOSITORY) private readonly repository: PharmacyRepository) {}

  createMedicine(dto: CreateMedicineDto) {
    return this.repository.createMedicine(dto);
  }

  listMedicines(query: PharmacyTenantQueryDto) {
    return this.repository.listMedicines(query);
  }

  addStockLot(dto: AddStockLotDto) {
    return this.repository.addStockLot(dto);
  }

  listStock(query: PharmacyTenantQueryDto) {
    return this.repository.listStock(query);
  }

  createPrescription(dto: CreatePrescriptionDto) {
    return this.repository.createPrescription(dto);
  }

  addPrescriptionItem(prescriptionId: string, dto: AddPrescriptionItemDto) {
    return this.repository.addPrescriptionItem(prescriptionId, dto);
  }

  dispense(dto: DispenseItemDto) {
    return this.repository.dispense(dto);
  }

  recordInteractionWarning(dto: InteractionWarningDto) {
    return this.repository.recordInteractionWarning(dto);
  }
}
