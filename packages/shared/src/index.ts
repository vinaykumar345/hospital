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

export interface ApiEnvelope<T> {
  data: T;
  requestId: string;
}
