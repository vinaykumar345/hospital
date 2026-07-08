import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PATIENT_REPOSITORY } from "./patient.constants.js";
import { ConsentRecordDto, PatientRecordDto, PatientTenantQueryDto, RegisterPatientDto, VisitRecordDto } from "./dto/patient.dto.js";
import { PatientRepository } from "./patient.repository.js";

@Injectable()
export class PatientService {
  constructor(@Inject(PATIENT_REPOSITORY) private readonly repository: PatientRepository) {}

  register(dto: RegisterPatientDto) {
    return this.repository.register(dto);
  }

  list(query: PatientTenantQueryDto) {
    return this.repository.list(query);
  }

  async get(tenantId: string, patientId: string) {
    const patient = await this.repository.get(tenantId, patientId);
    if (!patient) {
      throw new NotFoundException("Patient not found.");
    }
    return patient;
  }

  addAllergy(patientId: string, dto: PatientRecordDto) {
    return this.repository.addAllergy(patientId, dto);
  }

  addMedication(patientId: string, dto: PatientRecordDto) {
    return this.repository.addMedication(patientId, dto);
  }

  addEmergencyContact(patientId: string, dto: PatientRecordDto) {
    return this.repository.addEmergencyContact(patientId, dto);
  }

  addInsurance(patientId: string, dto: PatientRecordDto) {
    return this.repository.addInsurance(patientId, dto);
  }

  addConsent(patientId: string, dto: ConsentRecordDto) {
    return this.repository.addConsent(patientId, dto);
  }

  addVisit(patientId: string, dto: VisitRecordDto) {
    return this.repository.addVisit(patientId, dto);
  }
}
