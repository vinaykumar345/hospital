export const AI_REVIEW_DISCLAIMER = "AI-generated content. Please review before use.";

export const ROLE_NAMES = [
  "SUPER_ADMIN",
  "HOSPITAL_ADMIN",
  "DOCTOR",
  "RECEPTIONIST",
  "NURSE",
  "LAB_TECHNICIAN",
  "PHARMACIST",
  "BILLING_STAFF",
  "PATIENT",
  "INSURANCE_COORDINATOR"
] as const;

export type RoleName = (typeof ROLE_NAMES)[number];

export const PERMISSION_NAMES = [
  "TENANT_MANAGE",
  "USER_MANAGE",
  "ROLE_MANAGE",
  "HOSPITAL_PROFILE_MANAGE",
  "PATIENT_READ",
  "PATIENT_WRITE",
  "APPOINTMENT_READ",
  "APPOINTMENT_WRITE",
  "CLINICAL_NOTE_READ",
  "CLINICAL_NOTE_WRITE",
  "LAB_ORDER_MANAGE",
  "PHARMACY_MANAGE",
  "BILLING_MANAGE",
  "INSURANCE_MANAGE",
  "AI_AGENT_USE",
  "AUDIT_READ"
] as const;

export type PermissionName = (typeof PERMISSION_NAMES)[number];

export interface ApiEnvelope<T> {
  data: T;
  requestId: string;
}
