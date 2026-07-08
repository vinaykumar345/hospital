import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

assert.equal(existsSync(new URL("../src/main.ts", import.meta.url)), true);

const main = readFileSync(new URL("../src/main.ts", import.meta.url), "utf8");
const health = readFileSync(new URL("../src/modules/health/health.controller.ts", import.meta.url), "utf8");

assert.match(main, /setGlobalPrefix\("api\/v1"\)/);
assert.match(main, /ValidationPipe/);
assert.match(health, /AI_REVIEW_DISCLAIMER/);

console.log("api setup smoke tests passed");
