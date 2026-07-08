import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/appointment/appointment.controller.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0007_appointment_system.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/appointment/appointment.module.ts", import.meta.url)), true);
assert.match(controller, /@Controller\("appointments"\)/);
assert.match(controller, /queue/);
assert.match(controller, /@RequirePermissions\("APPOINTMENT_WRITE"\)/);
assert.match(migration, /create table if not exists appointments/);
assert.match(migration, /appointment_queue/);
assert.match(migration, /appointment_reminders/);
assert.match(migration, /TELECONSULTATION/);

console.log("appointment system smoke tests passed");
