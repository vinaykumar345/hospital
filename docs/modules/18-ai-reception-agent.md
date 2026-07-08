# Module 18: AI Reception Agent

## Understand

The AI Reception Agent helps book appointments, answer FAQs, direct patients to departments, estimate wait time, and manage queue-related action drafts.

## Roles

Receptionist, Hospital Admin, and Patient-facing assistants use this module according to `AI_AGENT_USE`.

## Database

Tables: `ai_agent_interactions` and `reception_agent_actions`.

## APIs

Routes are exposed under `/api/v1/ai-agents/reception`.

## Security Rules

- Requires `AI_AGENT_USE`.
- Every response includes: "AI-generated content. Please review before use."
- The agent assists operations only and does not replace licensed medical judgment.
- Appointment booking actions are drafts until confirmed by staff or authenticated workflow.

## Tests

Run `npm run test` from the repository root.
