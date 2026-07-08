import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/ai-agent/ai-agent.controller.ts", import.meta.url), "utf8");
const service = readFileSync(new URL("../src/modules/ai-agent/ai-agent.service.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0020_ai_voice_follow_up_agent.sql", import.meta.url), "utf8");

assert.match(controller, /voice-follow-up\/campaigns/);
assert.match(controller, /voice-follow-up\/calls/);
assert.match(service, /does not provide diagnosis or treatment decisions/);
assert.match(migration, /voice_follow_up_campaigns/);
assert.match(migration, /voice_follow_up_calls/);
assert.match(migration, /provider_call_id/);

console.log("ai voice follow-up agent smoke tests passed");
