import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const ci = readFileSync(join(root, ".github/workflows/ci.yml"), "utf8");
const release = readFileSync(join(root, ".github/workflows/release.yml"), "utf8");

assert.equal(existsSync(join(root, ".github/workflows/ci.yml")), true);
assert.equal(existsSync(join(root, ".github/workflows/release.yml")), true);
assert.match(ci, /npm run test/);
assert.match(ci, /Validate Kubernetes manifests/);
assert.match(release, /docker build -f apps\/api\/Dockerfile/);
assert.match(release, /workflow_dispatch/);

console.log("ci/cd verification passed");
