import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const migration = readFileSync(new URL("../migrations/0010_nurse_dashboard.sql", import.meta.url), "utf8");
const controller = readFileSync(new URL("../src/modules/dashboard/dashboard.controller.ts", import.meta.url), "utf8");
const repository = readFileSync(new URL("../src/modules/dashboard/postgres-dashboard.repository.ts", import.meta.url), "utf8");

assert.match(controller, /@Get\("nurse"\)/);
assert.match(controller, /CLINICAL_NOTE_READ/);
assert.match(repository, /getNurseDashboard/);
assert.match(migration, /create table if not exists nurse_dashboard_tasks/);
assert.match(migration, /SHIFT_HANDOVER/);
assert.match(migration, /VITAL_SIGNS/);
assert.match(migration, /enable row level security/);

console.log("nurse dashboard smoke tests passed");
