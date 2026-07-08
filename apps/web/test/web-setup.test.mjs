import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../src/main.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");

assert.match(app, /AI_REVIEW_DISCLAIMER/);
assert.match(app, /ROLE_NAMES/);
assert.match(app, /Email Login/);
assert.match(app, /Mobile OTP/);
assert.match(app, /Hospital Tenant Setup/);
assert.match(app, /Domain mapping/);
assert.match(app, /Role-Based Access/);
assert.match(app, /PERMISSION_NAMES/);
assert.match(app, /Hospital Management/);
assert.match(app, /Departments/);
assert.match(app, /Staff Management/);
assert.match(app, /Doctor schedules/);
assert.match(app, /Patient Management/);
assert.match(app, /Medical history/);
assert.match(styles, /grid-template-columns/);

console.log("web setup smoke tests passed");
