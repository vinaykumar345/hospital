import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
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
export class PostgresPharmacyRepository implements PharmacyRepository {
  constructor(private readonly postgres: PostgresService) {}

  async createMedicine(dto: CreateMedicineDto) {
    const result = await this.postgres.query(
      `insert into medicines (tenant_id, name, generic_name) values ($1, $2, $3) returning *`,
      [dto.tenantId, dto.name, dto.genericName ?? null]
    );
    return result.rows[0];
  }

  async listMedicines(query: PharmacyTenantQueryDto) {
    const result = await this.postgres.query(`select * from medicines where tenant_id = $1 order by name`, [query.tenantId]);
    return result.rows;
  }

  async addStockLot(dto: AddStockLotDto) {
    const result = await this.postgres.query(
      `insert into pharmacy_stock_lots (tenant_id, medicine_id, batch_number, quantity_available, expires_on)
       values ($1, $2, $3, $4, $5::date) returning *`,
      [dto.tenantId, dto.medicineId, dto.batchNumber, dto.quantity, dto.expiresOn]
    );
    if (new Date(dto.expiresOn).getTime() < Date.now() + 30 * 24 * 60 * 60 * 1000) {
      await this.postgres.query(
        `insert into pharmacy_expiry_alerts (tenant_id, stock_lot_id, message) values ($1, $2, 'Stock lot expires within 30 days.')`,
        [dto.tenantId, result.rows[0].id]
      );
    }
    return result.rows[0];
  }

  async listStock(query: PharmacyTenantQueryDto) {
    const result = await this.postgres.query(
      `select psl.*, m.name as medicine_name from pharmacy_stock_lots psl
       join medicines m on m.id = psl.medicine_id
       where psl.tenant_id = $1
       order by psl.expires_on asc`,
      [query.tenantId]
    );
    return result.rows;
  }

  async createPrescription(dto: CreatePrescriptionDto) {
    const result = await this.postgres.query(
      `insert into prescriptions (tenant_id, patient_id, prescribed_by_user_id) values ($1, $2, $3) returning *`,
      [dto.tenantId, dto.patientId, dto.prescribedByUserId]
    );
    return result.rows[0];
  }

  async addPrescriptionItem(prescriptionId: string, dto: AddPrescriptionItemDto) {
    const result = await this.postgres.query(
      `insert into prescription_items (tenant_id, prescription_id, medicine_id, dosage, frequency, duration)
       values ($1, $2, $3, $4, $5, $6) returning *`,
      [dto.tenantId, prescriptionId, dto.medicineId, dto.dosage, dto.frequency, dto.duration]
    );
    return result.rows[0];
  }

  async dispense(dto: DispenseItemDto) {
    const result = await this.postgres.query(
      `insert into pharmacy_dispenses (tenant_id, prescription_item_id, stock_lot_id, quantity)
       values ($1, $2, $3, $4) returning *`,
      [dto.tenantId, dto.prescriptionItemId, dto.stockLotId, dto.quantity]
    );
    await this.postgres.query(
      `update pharmacy_stock_lots
       set quantity_available = greatest(quantity_available - $3, 0), updated_at = now()
       where id = $1 and tenant_id = $2`,
      [dto.stockLotId, dto.tenantId, dto.quantity]
    );
    return result.rows[0];
  }

  async recordInteractionWarning(dto: InteractionWarningDto) {
    const result = await this.postgres.query(
      `insert into pharmacy_interaction_warnings (tenant_id, prescription_id, severity, message)
       values ($1, $2, $3, $4) returning *`,
      [dto.tenantId, dto.prescriptionId, dto.severity, dto.message]
    );
    return result.rows[0];
  }
}
