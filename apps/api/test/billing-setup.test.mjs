import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/billing/billing.controller.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0013_billing_module.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/billing/billing.module.ts", import.meta.url)), true);
assert.match(controller, /@Controller\("billing"\)/);
assert.match(controller, /invoices/);
assert.match(controller, /payments/);
assert.match(controller, /BILLING_MANAGE/);
assert.match(migration, /create table if not exists invoices/);
assert.match(migration, /invoice_lines/);
assert.match(migration, /invoice_payments/);
assert.match(migration, /PAYMENT_GATEWAY/);

console.log("billing module smoke tests passed");
