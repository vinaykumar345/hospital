# Product Requirements Document

## Product

AI Hospital Assistant is a modular SaaS platform for hospitals, clinics, diagnostic centers, and telemedicine providers.

## Goals

- Automate administrative workflows.
- Assist clinicians with documentation.
- Improve patient communication.
- Provide operational insights.
- Maintain tenant isolation, auditability, and security.

## Users

Super Admin, Hospital Admin, Doctor, Receptionist, Nurse, Lab Technician, Pharmacist, Billing Staff, Patient, and Insurance Coordinator.

## AI Safety Requirement

Every AI feature must display: "AI-generated content. Please review before use."

AI must not claim to replace licensed medical judgment, provide final diagnosis, or override clinician review.

## Build Order

The implementation follows the module order in the user prompt, beginning with project setup and ending with production hardening.
