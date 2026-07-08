# Module 19: AI Doctor Agent

## Understand

The AI Doctor Agent assists clinicians with patient summaries, consultation-note drafts, differential suggestions, medication interaction highlights, referral letters, discharge summaries, and follow-up plans.

## Roles

Doctor uses this module according to `AI_AGENT_USE`.

## Database

Table: `doctor_agent_outputs`.

## APIs

Route: `POST /api/v1/ai-agents/doctor/draft`.

## Security Rules

- Requires `AI_AGENT_USE`.
- Every output includes: "AI-generated content. Please review before use."
- Differential diagnoses are suggestions only.
- Drafts require clinician review and never replace licensed medical judgment.

## Tests

Run `npm run test` from the repository root.
