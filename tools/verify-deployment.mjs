import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const required = [
  "apps/api/Dockerfile",
  "apps/web/Dockerfile",
  "infra/k8s/base/api-configmap.yaml",
  "infra/k8s/base/api-secret.example.yaml",
  "infra/k8s/base/web-deployment.yaml",
  "infra/k8s/base/web-service.yaml",
  "infra/k8s/base/ingress.yaml",
  "infra/k8s/base/api-hpa.yaml",
  "infra/k8s/base/web-hpa.yaml"
];

for (const file of required) {
  assert.equal(existsSync(join(root, file)), true, `${file} must exist`);
}

const ingress = readFileSync(join(root, "infra/k8s/base/ingress.yaml"), "utf8");
assert.match(ingress, /path: \/api/);
assert.match(ingress, /name: web/);

console.log("deployment verification passed");
