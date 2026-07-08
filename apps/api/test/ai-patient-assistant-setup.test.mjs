import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/ai-agent/ai-agent.controller.ts", import.meta.url), "utf8");
const service = readFileSync(new URL("../src/modules/ai-agent/ai-agent.service.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0019_ai_patient_assistant.sql", import.meta.url), "utf8");

assert.match(controller, /patient\/respond/);
assert.match(service, /not a diagnosis or treatment decision/);
assert.match(service, /licensed clinician/);
assert.match(service, /AI_REVIEW_DISCLAIMER/);
assert.match(migration, /patient_assistant_responses/);
assert.match(migration, /REPORT_EXPLANATION/);
assert.match(migration, /PATIENT_EDUCATION/);

console.log("ai patient assistant smoke tests passed");
