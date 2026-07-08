import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/notification/notification.controller.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0015_notification_system.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/notification/notification.module.ts", import.meta.url)), true);
assert.match(controller, /@Controller\("notifications"\)/);
assert.match(controller, /templates/);
assert.match(controller, /preferences/);
assert.match(migration, /notification_templates/);
assert.match(migration, /notification_deliveries/);
assert.match(migration, /WHATSAPP/);
assert.match(migration, /PUSH/);

console.log("notification system smoke tests passed");
