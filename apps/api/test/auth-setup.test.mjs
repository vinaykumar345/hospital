import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const authController = readFileSync(new URL("../src/modules/auth/auth.controller.ts", import.meta.url), "utf8");
const authService = readFileSync(new URL("../src/modules/auth/auth.service.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0001_authentication.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/auth/auth.module.ts", import.meta.url)), true);
assert.match(authController, /@Controller\("auth"\)/);
assert.match(authController, /@Post\("register"\)/);
assert.match(authController, /@Post\("mobile\/request-otp"\)/);
assert.match(authController, /@Post\("password\/reset"\)/);
assert.match(authService, /MAX_FAILED_LOGIN_ATTEMPTS/);
assert.match(authService, /AUTH_LOGIN_SUCCEEDED/);
assert.doesNotMatch(authService, /resetTokenPreview/);
assert.match(migration, /create table if not exists user_credentials/);
assert.match(migration, /create table if not exists auth_sessions/);
assert.match(migration, /create table if not exists auth_delivery_outbox/);
assert.match(migration, /create table if not exists audit_events/);

console.log("auth module smoke tests passed");
