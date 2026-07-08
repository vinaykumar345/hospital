import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/ai-agent/ai-agent.controller.ts", import.meta.url), "utf8");
const service = readFileSync(new URL("../src/modules/ai-agent/ai-agent.service.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0017_ai_doctor_agent.sql", import.meta.url), "utf8");

assert.match(controller, /doctor\/draft/);
assert.match(service, /AI_REVIEW_DISCLAIMER/);
assert.match(service, /suggestions only/);
assert.match(service, /licensed clinician/);
assert.match(migration, /doctor_agent_outputs/);
assert.match(migration, /DIFFERENTIAL_SUGGESTIONS/);
assert.match(migration, /PENDING_REVIEW/);

console.log("ai doctor agent smoke tests passed");
