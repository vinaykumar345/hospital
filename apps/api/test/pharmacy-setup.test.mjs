import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/pharmacy/pharmacy.controller.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0012_pharmacy_module.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/pharmacy/pharmacy.module.ts", import.meta.url)), true);
assert.match(controller, /@Controller\("pharmacy"\)/);
assert.match(controller, /interaction-warnings/);
assert.match(controller, /dispenses/);
assert.match(controller, /PHARMACY_MANAGE/);
assert.match(migration, /create table if not exists medicines/);
assert.match(migration, /pharmacy_stock_lots/);
assert.match(migration, /pharmacy_expiry_alerts/);
assert.match(migration, /pharmacy_interaction_warnings/);

console.log("pharmacy module smoke tests passed");
