import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const migration = readFileSync(new URL("../migrations/0009_doctor_dashboard.sql", import.meta.url), "utf8");
const controller = readFileSync(new URL("../src/modules/dashboard/dashboard.controller.ts", import.meta.url), "utf8");

assert.match(controller, /@Get\("doctor"\)/);
assert.match(controller, /CLINICAL_NOTE_READ/);
assert.match(migration, /create table if not exists doctor_dashboard_tasks/);
assert.match(migration, /PENDING_DOCUMENTATION/);
assert.match(migration, /FOLLOW_UP/);
assert.match(migration, /enable row level security/);

console.log("doctor dashboard smoke tests passed");
