import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/index.ts", import.meta.url), "utf8");

assert.match(source, /AI-generated content\. Please review before use\./);
assert.match(source, /SUPER_ADMIN/);
assert.match(source, /INSURANCE_COORDINATOR/);

console.log("shared contract smoke tests passed");
