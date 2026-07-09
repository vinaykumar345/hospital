import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const required = ["SECURITY.md", "docs/PRODUCTION_HARDENING.md", "docs/modules/30-final-production-hardening.md"];

for (const file of required) {
  assert.equal(existsSync(join(root, file)), true, `${file} must exist`);
}

const hardening = readFileSync(join(root, "docs/PRODUCTION_HARDENING.md"), "utf8");
assert.match(hardening, /AI-generated content\. Please review before use\./);
assert.match(hardening, /TLS/);
assert.match(hardening, /backups/i);
assert.match(hardening, /PHI/);

const security = readFileSync(join(root, "SECURITY.md"), "utf8");
assert.match(security, /Tenant isolation/);
assert.match(security, /Role-based access control/);

const renderBlueprint = readFileSync(join(root, "render.yaml"), "utf8");
assert.doesNotMatch(renderBlueprint, /key:\s*CORS_ORIGIN[\s\S]{0,120}value:\s*"\*"/);

console.log("production hardening verification passed");
