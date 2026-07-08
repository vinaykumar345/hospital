import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/tenancy/tenancy.controller.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0002_multi_tenant_hospital_setup.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/tenancy/tenancy.module.ts", import.meta.url)), true);
assert.match(controller, /@Controller\("tenants"\)/);
assert.match(controller, /branding/);
assert.match(controller, /domain/);
assert.match(migration, /create table if not exists tenants/);
assert.match(migration, /create table if not exists tenant_domains/);
assert.match(migration, /create table if not exists tenant_branding/);
assert.match(migration, /enable row level security/);
assert.match(migration, /current_setting\('app\.tenant_id'/);

console.log("tenancy module smoke tests passed");
