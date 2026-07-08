import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/laboratory/laboratory.controller.ts", import.meta.url), "utf8");
const repository = readFileSync(new URL("../src/modules/laboratory/postgres-laboratory.repository.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0011_laboratory_module.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/laboratory/laboratory.module.ts", import.meta.url)), true);
assert.match(controller, /@Controller\("laboratory"\)/);
assert.match(controller, /samples/);
assert.match(controller, /results/);
assert.match(controller, /LAB_ORDER_MANAGE/);
assert.match(repository, /AI_REVIEW_DISCLAIMER/);
assert.match(migration, /create table if not exists lab_orders/);
assert.match(migration, /lab_critical_alerts/);
assert.match(migration, /lab_result_summary_requests/);

console.log("laboratory module smoke tests passed");
