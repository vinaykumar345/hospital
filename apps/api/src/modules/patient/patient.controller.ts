import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import { ConsentRecordDto, PatientRecordDto, PatientTenantQueryDto, RegisterPatientDto, VisitRecordDto } from "./dto/patient.dto.js";
import { PatientService } from "./patient.service.js";

@ApiTags("patient-management")
@Controller("patients")
@UseGuards(RbacGuard)
export class PatientController {
  constructor(private readonly patients: PatientService) {}

  @Get()
  @RequirePermissions("PATIENT_READ")
  list(@Query() query: PatientTenantQueryDto) {
    return this.patients.list(query);
  }

  @Post()
  @RequirePermissions("PATIENT_WRITE")
  register(@Body() dto: RegisterPatientDto) {
    return this.patients.register(dto);
  }

  @Get(":patientId")
  @RequirePermissions("PATIENT_READ")
  get(@Param("patientId") patientId: string, @Query("tenantId") tenantId: string) {
    return this.patients.get(tenantId, patientId);
  }

  @Post(":patientId/allergies")
  @RequirePermissions("PATIENT_WRITE")
  addAllergy(@Param("patientId") patientId: string, @Body() dto: PatientRecordDto) {
    return this.patients.addAllergy(patientId, dto);
  }

  @Post(":patientId/medications")
  @RequirePermissions("PATIENT_WRITE")
  addMedication(@Param("patientId") patientId: string, @Body() dto: PatientRecordDto) {
    return this.patients.addMedication(patientId, dto);
  }

  @Post(":patientId/emergency-contacts")
  @RequirePermissions("PATIENT_WRITE")
  addEmergencyContact(@Param("patientId") patientId: string, @Body() dto: PatientRecordDto) {
    return this.patients.addEmergencyContact(patientId, dto);
  }

  @Post(":patientId/insurance")
  @RequirePermissions("PATIENT_WRITE")
  addInsurance(@Param("patientId") patientId: string, @Body() dto: PatientRecordDto) {
    return this.patients.addInsurance(patientId, dto);
  }

  @Post(":patientId/consents")
  @RequirePermissions("PATIENT_WRITE")
  addConsent(@Param("patientId") patientId: string, @Body() dto: ConsentRecordDto) {
    return this.patients.addConsent(patientId, dto);
  }

  @Post(":patientId/visits")
  @RequirePermissions("PATIENT_WRITE")
  addVisit(@Param("patientId") patientId: string, @Body() dto: VisitRecordDto) {
    return this.patients.addVisit(patientId, dto);
  }
}
