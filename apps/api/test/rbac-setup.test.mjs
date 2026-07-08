import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const guard = readFileSync(new URL("../src/common/security/rbac.guard.ts", import.meta.url), "utf8");
const decorator = readFileSync(new URL("../src/common/security/permissions.decorator.ts", import.meta.url), "utf8");
const controller = readFileSync(new URL("../src/modules/rbac/rbac.controller.ts", import.meta.url), "utf8");
const tokenService = readFileSync(new URL("../src/modules/auth/token.service.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0003_role_based_access_control.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/rbac/rbac.module.ts", import.meta.url)), true);
assert.match(guard, /ForbiddenException/);
assert.match(decorator, /required_permissions/);
assert.match(controller, /@RequirePermissions\("ROLE_MANAGE"\)/);
assert.match(tokenService, /permissions: user\.permissions/);
assert.match(migration, /create table if not exists permissions/);
assert.match(migration, /create table if not exists role_permissions/);
assert.match(migration, /AI_AGENT_USE/);

console.log("rbac module smoke tests passed");
