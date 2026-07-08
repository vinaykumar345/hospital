import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import {
  AddPrescriptionItemDto,
  AddStockLotDto,
  CreateMedicineDto,
  CreatePrescriptionDto,
  DispenseItemDto,
  InteractionWarningDto,
  PharmacyTenantQueryDto
} from "./dto/pharmacy.dto.js";
import { PharmacyService } from "./pharmacy.service.js";

@ApiTags("pharmacy")
@Controller("pharmacy")
@UseGuards(RbacGuard)
export class PharmacyController {
  constructor(private readonly pharmacy: PharmacyService) {}

  @Get("medicines")
  @RequirePermissions("PHARMACY_MANAGE")
  listMedicines(@Query() query: PharmacyTenantQueryDto) {
    return this.pharmacy.listMedicines(query);
  }

  @Post("medicines")
  @RequirePermissions("PHARMACY_MANAGE")
  createMedicine(@Body() dto: CreateMedicineDto) {
    return this.pharmacy.createMedicine(dto);
  }

  @Get("stock")
  @RequirePermissions("PHARMACY_MANAGE")
  listStock(@Query() query: PharmacyTenantQueryDto) {
    return this.pharmacy.listStock(query);
  }

  @Post("stock")
  @RequirePermissions("PHARMACY_MANAGE")
  addStockLot(@Body() dto: AddStockLotDto) {
    return this.pharmacy.addStockLot(dto);
  }

  @Post("prescriptions")
  @RequirePermissions("PHARMACY_MANAGE")
  createPrescription(@Body() dto: CreatePrescriptionDto) {
    return this.pharmacy.createPrescription(dto);
  }

  @Post("prescriptions/:prescriptionId/items")
  @RequirePermissions("PHARMACY_MANAGE")
  addPrescriptionItem(@Param("prescriptionId") prescriptionId: string, @Body() dto: AddPrescriptionItemDto) {
    return this.pharmacy.addPrescriptionItem(prescriptionId, dto);
  }

  @Post("dispenses")
  @RequirePermissions("PHARMACY_MANAGE")
  dispense(@Body() dto: DispenseItemDto) {
    return this.pharmacy.dispense(dto);
  }

  @Post("interaction-warnings")
  @RequirePermissions("PHARMACY_MANAGE")
  recordInteractionWarning(@Body() dto: InteractionWarningDto) {
    return this.pharmacy.recordInteractionWarning(dto);
  }
}
