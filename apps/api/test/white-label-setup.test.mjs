import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const controller = readFileSync(new URL("../src/modules/white-label/white-label.controller.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../migrations/0022_white_label_system.sql", import.meta.url), "utf8");

assert.equal(existsSync(new URL("../src/modules/white-label/white-label.module.ts", import.meta.url)), true);
assert.match(controller, /white-label/);
assert.match(controller, /email-templates/);
assert.match(controller, /HOSPITAL_PROFILE_MANAGE/);
assert.match(migration, /white_label_assets/);
assert.match(migration, /MOBILE_SPLASH/);
assert.match(migration, /white_label_email_templates/);

console.log("white-label system smoke tests passed");
