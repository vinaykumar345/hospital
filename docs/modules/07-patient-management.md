# Module 7: Patient Management

## Understand

Patient management covers digital registration, profile lookup, medical history foundations, allergies, current medications, emergency contacts, insurance details, consent records, and visit history.

## Roles

Receptionist, Doctor, Nurse, Lab Technician, Pharmacist, Billing Staff, Insurance Coordinator, and Patient use patient records according to permissions.

## Database

Tables: `patients`, `patient_allergies`, `patient_medications`, `patient_emergency_contacts`, `patient_insurance_details`, `patient_consents`, and `patient_visits`.

## APIs

Routes are exposed under `/api/v1/patients`.

## Security Rules

- Read routes require `PATIENT_READ`.
- Write routes require `PATIENT_WRITE`.
- Patient tables are tenant-owned and protected by row-level security.
- PHI is never exposed outside the tenant context.

## Tests

Run `npm run test` from the repository root.
