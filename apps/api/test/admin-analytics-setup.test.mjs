import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/dashboard/dashboard.controller.ts", import.meta.url), "utf8");
const repository = readFileSync(new URL("../src/modules/dashboard/postgres-dashboard.repository.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0021_admin_analytics_dashboard.sql", import.meta.url), "utf8");

assert.match(controller, /admin-analytics/);
assert.match(controller, /AUDIT_READ/);
assert.match(repository, /daily_revenue/);
assert.match(repository, /bedOccupancy/);
assert.match(repository, /AI_REVIEW_DISCLAIMER/);
assert.match(migration, /admin_operational_insights/);

console.log("admin analytics dashboard smoke tests passed");
