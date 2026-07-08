import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/audit/audit.controller.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0024_audit_logs.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/audit/audit.module.ts", import.meta.url)), true);
assert.match(controller, /@Controller\("audit"\)/);
assert.match(controller, /AUDIT_READ/);
assert.match(migration, /request_id/);
assert.match(migration, /entity_type/);
assert.match(migration, /audit_events_actor_idx/);

console.log("audit logs smoke tests passed");
