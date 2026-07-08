import { ConsentRecordDto, PatientRecordDto, PatientTenantQueryDto, RegisterPatientDto, VisitRecordDto } from "./dto/patient.dto.js";

export interface PatientRepository {
  register(dto: RegisterPatientDto): Promise<unknown>;
  list(query: PatientTenantQueryDto): Promise<unknown[]>;
  get(tenantId: string, patientId: string): Promise<unknown>;
  addAllergy(patientId: string, dto: PatientRecordDto): Promise<unknown>;
  addMedication(patientId: string, dto: PatientRecordDto): Promise<unknown>;
  addEmergencyContact(patientId: string, dto: PatientRecordDto): Promise<unknown>;
  addInsurance(patientId: string, dto: PatientRecordDto): Promise<unknown>;
  addConsent(patientId: string, dto: ConsentRecordDto): Promise<unknown>;
  addVisit(patientId: string, dto: VisitRecordDto): Promise<unknown>;
}
