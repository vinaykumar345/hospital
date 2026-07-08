import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/patient/patient.controller.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0006_patient_management.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/patient/patient.module.ts", import.meta.url)), true);
assert.match(controller, /@Controller\("patients"\)/);
assert.match(controller, /allergies/);
assert.match(controller, /medications/);
assert.match(controller, /consents/);
assert.match(controller, /@RequirePermissions\("PATIENT_WRITE"\)/);
assert.match(migration, /create table if not exists patients/);
assert.match(migration, /patient_insurance_details/);
assert.match(migration, /enable row level security/);

console.log("patient management smoke tests passed");
