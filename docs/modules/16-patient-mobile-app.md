# Module 16: Patient Mobile App

## Understand

The patient mobile app provides patient-facing access to appointments, prescriptions, lab reports, invoices, medication reminders, hospital AI assistant chat, follow-up reminders, and family member management.

## Roles

Patient is the primary role. Hospital staff can support patient onboarding from web workflows.

## Mobile Screens

The Flutter scaffold now exposes patient workflow entry cards for:

- Booking and upcoming appointments
- Prescriptions
- Lab reports
- Invoices
- Medication reminders
- Follow-up reminders
- Family members
- Hospital AI assistant

## Security Rules

- Patient mobile access must use authenticated tenant context.
- Family member access must be permission-aware.
- AI assistant content must show: "AI-generated content. Please review before use."

## Tests

Run `npm run test` from the repository root. Flutter widget tests are present, but local Flutter execution may require SDK cache write access.
