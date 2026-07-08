import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../src/main.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");

assert.match(app, /AI_REVIEW_DISCLAIMER/);
assert.match(app, /ROLE_NAMES/);
assert.match(app, /Email Login/);
assert.match(app, /Mobile OTP/);
assert.match(styles, /grid-template-columns/);

console.log("web setup smoke tests passed");
