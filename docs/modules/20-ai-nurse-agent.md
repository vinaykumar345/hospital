# Module 20: AI Nurse Agent

## Understand

The AI Nurse Agent assists with shift handover summaries, medication schedule drafts, nursing task summaries, vital sign notes, and patient observation logs.

## Roles

Nurse uses this module according to `AI_AGENT_USE`.

## Database

Table: `nurse_agent_outputs`.

## APIs

Route: `POST /api/v1/ai-agents/nurse/draft`.

## Security Rules

- Requires `AI_AGENT_USE`.
- Every output includes: "AI-generated content. Please review before use."
- Drafts require nurse or clinician review and never replace professional judgment.

## Tests

Run `npm run test` from the repository root.
