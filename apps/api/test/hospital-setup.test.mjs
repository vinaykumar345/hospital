import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/hospital/hospital.controller.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0004_hospital_management.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/hospital/hospital.module.ts", import.meta.url)), true);
assert.match(controller, /@Controller\("hospital"\)/);
assert.match(controller, /departments/);
assert.match(controller, /branches/);
assert.match(controller, /beds/);
assert.match(controller, /@RequirePermissions\("HOSPITAL_PROFILE_MANAGE"\)/);
assert.match(migration, /create table if not exists departments/);
assert.match(migration, /create table if not exists doctor_schedules/);
assert.match(migration, /enable row level security/);

console.log("hospital management smoke tests passed");
