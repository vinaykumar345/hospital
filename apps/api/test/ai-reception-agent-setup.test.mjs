import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/ai-agent/ai-agent.controller.ts", import.meta.url), "utf8");
const service = readFileSync(new URL("../src/modules/ai-agent/ai-agent.service.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0016_ai_reception_agent.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/ai-agent/ai-agent.module.ts", import.meta.url)), true);
assert.match(controller, /reception\/respond/);
assert.match(controller, /AI_AGENT_USE/);
assert.match(service, /AI_REVIEW_DISCLAIMER/);
assert.match(service, /licensed|availability|staff member/);
assert.match(migration, /ai_agent_interactions/);
assert.match(migration, /reception_agent_actions/);
assert.match(migration, /BOOK_APPOINTMENT/);

console.log("ai reception agent smoke tests passed");
