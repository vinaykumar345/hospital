import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/ai-agent/ai-agent.controller.ts", import.meta.url), "utf8");
const service = readFileSync(new URL("../src/modules/ai-agent/ai-agent.service.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0018_ai_nurse_agent.sql", import.meta.url), "utf8");

assert.match(controller, /nurse\/draft/);
assert.match(service, /Draft for nurse review only/);
assert.match(service, /AI_REVIEW_DISCLAIMER/);
assert.match(migration, /nurse_agent_outputs/);
assert.match(migration, /SHIFT_HANDOVER/);
assert.match(migration, /VITAL_SIGNS_NOTE/);
assert.match(migration, /PENDING_REVIEW/);

console.log("ai nurse agent smoke tests passed");
