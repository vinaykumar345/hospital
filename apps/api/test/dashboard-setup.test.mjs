import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/dashboard/dashboard.controller.ts", import.meta.url), "utf8");
const repository = readFileSync(new URL("../src/modules/dashboard/postgres-dashboard.repository.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0008_reception_dashboard.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/dashboard/dashboard.module.ts", import.meta.url)), true);
assert.match(controller, /dashboards/);
assert.match(controller, /reception/);
assert.match(controller, /doctor/);
assert.match(controller, /@RequirePermissions\("APPOINTMENT_READ"\)/);
assert.match(repository, /walk_ins/);
assert.match(repository, /upcomingAppointments/);
assert.match(repository, /todaysAppointments/);
assert.match(migration, /reception_dashboard_queue_summary/);

console.log("reception dashboard smoke tests passed");
