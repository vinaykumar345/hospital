# Module 22: AI Voice Calling Patient Follow-Up Agent

## Understand

The voice follow-up agent supports reviewed outbound call campaigns for post-visit follow-up, medication adherence, lab follow-up, and appointment reminders.

## Roles

Hospital Admin, Doctor, Nurse, and Patient Assistant operators use this module according to `AI_AGENT_USE`.

## Database

Tables: `voice_follow_up_campaigns` and `voice_follow_up_calls`.

## APIs

Routes are exposed under `/api/v1/ai-agents/voice-follow-up`.

## Security Rules

- Requires `AI_AGENT_USE`.
- Scripts must be reviewed.
- Calls are support workflows only and must not provide diagnosis or treatment decisions.
- Telephony provider credentials must be stored in deployment secrets.

## Tests

Run `npm run test` from the repository root.
