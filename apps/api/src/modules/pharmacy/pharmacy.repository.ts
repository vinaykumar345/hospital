import {
  AddPrescriptionItemDto,
  AddStockLotDto,
  CreateMedicineDto,
  CreatePrescriptionDto,
  DispenseItemDto,
  InteractionWarningDto,
  PharmacyTenantQueryDto
} from "./dto/pharmacy.dto.js";

export interface PharmacyRepository {
  createMedicine(dto: CreateMedicineDto): Promise<unknown>;
  listMedicines(query: PharmacyTenantQueryDto): Promise<unknown[]>;
  addStockLot(dto: AddStockLotDto): Promise<unknown>;
  listStock(query: PharmacyTenantQueryDto): Promise<unknown[]>;
  createPrescription(dto: CreatePrescriptionDto): Promise<unknown>;
  addPrescriptionItem(prescriptionId: string, dto: AddPrescriptionItemDto): Promise<unknown>;
  dispense(dto: DispenseItemDto): Promise<unknown>;
  recordInteractionWarning(dto: InteractionWarningDto): Promise<unknown>;
}
