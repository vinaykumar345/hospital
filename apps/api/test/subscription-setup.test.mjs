import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/subscription/subscription.controller.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0023_subscription_management.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/subscription/subscription.module.ts", import.meta.url)), true);
assert.match(controller, /subscriptions/);
assert.match(controller, /TENANT_MANAGE/);
assert.match(migration, /subscription_plans/);
assert.match(migration, /tenant_subscriptions/);
assert.match(migration, /subscription_invoices/);
assert.match(migration, /ENTERPRISE/);

console.log("subscription management smoke tests passed");
