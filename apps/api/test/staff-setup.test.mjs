import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/staff/staff.controller.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0005_staff_management.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/staff/staff.module.ts", import.meta.url)), true);
assert.match(controller, /@Controller\("staff"\)/);
assert.match(controller, /doctor-schedules/);
assert.match(controller, /@RequirePermissions\("USER_MANAGE"\)/);
assert.match(migration, /create table if not exists staff_profiles/);
assert.match(migration, /enable row level security/);

console.log("staff management smoke tests passed");
