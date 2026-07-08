# Module 8: Appointment System

## Understand

The appointment system supports calendar lists, doctor availability linkage, online booking, walk-in registration, queue management, reminders, and teleconsultation scheduling foundations.

## Roles

Receptionist, Doctor, Hospital Admin, and Patient use appointment workflows according to permissions.

## Database

Tables: `appointments`, `appointment_queue`, and `appointment_reminders`.

## APIs

Routes are exposed under `/api/v1/appointments`.

## Security Rules

- Read routes require `APPOINTMENT_READ`.
- Write and queue routes require `APPOINTMENT_WRITE`.
- Appointment tables are tenant-owned and protected by row-level security.
- Reminder delivery is queued and processed by the notification module.

## Tests

Run `npm run test` from the repository root.
