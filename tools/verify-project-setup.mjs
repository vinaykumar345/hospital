import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredPaths = [
  "README.md",
  ".env.example",
  "docs/PRD.md",
  "docs/ARCHITECTURE.md",
  "docs/API.md",
  "docs/DATABASE.md",
  "apps/api/src/main.ts",
  "apps/api/src/modules/auth/auth.module.ts",
  "apps/api/src/modules/tenancy/tenancy.module.ts",
  "apps/api/src/modules/rbac/rbac.module.ts",
  "apps/api/src/modules/hospital/hospital.module.ts",
  "apps/api/migrations/0001_authentication.sql",
  "apps/api/migrations/0002_multi_tenant_hospital_setup.sql",
  "apps/api/migrations/0003_role_based_access_control.sql",
  "apps/api/migrations/0004_hospital_management.sql",
  "apps/api/src/modules/health/health.controller.ts",
  "apps/web/src/main.tsx",
  "apps/mobile/lib/main.dart",
  "infra/docker/docker-compose.yml",
  "infra/k8s/base/api-deployment.yaml",
  ".github/workflows/ci.yml"
];

for (const relativePath of requiredPaths) {
  assert.equal(existsSync(join(root, relativePath)), true, `${relativePath} must exist`);
}

const filesWithAiDisclaimer = [
  "README.md",
  "packages/shared/src/index.ts",
  "apps/mobile/lib/main.dart"
];

for (const relativePath of filesWithAiDisclaimer) {
  const content = readFileSync(join(root, relativePath), "utf8");
  assert.match(content, /AI-generated content\. Please review before use\./, `${relativePath} must include AI review disclaimer`);
}

const gitignore = readFileSync(join(root, ".gitignore"), "utf8");
assert.match(gitignore, /^\.env$/m, ".env must be ignored");
assert.match(gitignore, /node_modules\//, "node_modules must be ignored");

console.log("project setup verification passed");
