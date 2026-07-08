import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/insurance/insurance.controller.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0014_insurance_module.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/insurance/insurance.module.ts", import.meta.url)), true);
assert.match(controller, /@Controller\("insurance"\)/);
assert.match(controller, /verification/);
assert.match(controller, /documents/);
assert.match(controller, /INSURANCE_MANAGE/);
assert.match(migration, /create table if not exists insurance_policies/);
assert.match(migration, /insurance_claims/);
assert.match(migration, /insurance_claim_documents/);
assert.match(migration, /s3_key/);

console.log("insurance module smoke tests passed");
