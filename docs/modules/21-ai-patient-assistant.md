# Module 21: AI Patient Assistant

## Understand

The AI Patient Assistant helps patients with hospital FAQs, report explanations, patient education, appointment recommendations, and follow-up reminders.

## Roles

Patient uses this module according to `AI_AGENT_USE`.

## Database

Table: `patient_assistant_responses`.

## APIs

Route: `POST /api/v1/ai-agents/patient/respond`.

## Security Rules

- Requires `AI_AGENT_USE`.
- Every output includes: "AI-generated content. Please review before use."
- Patient responses are general support information and must not be final diagnosis, treatment, or medical advice.

## Tests

Run `npm run test` from the repository root.
