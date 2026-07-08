import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const required = [
  "infra/docker/loki-config.yml",
  "infra/docker/promtail-config.yml",
  "infra/docker/otel-collector.yml",
  "infra/grafana/dashboards/api-overview.json",
  "infra/k8s/base/observability-configmap.yaml"
];

for (const file of required) {
  assert.equal(existsSync(join(root, file)), true, `${file} must exist`);
}

const compose = readFileSync(join(root, "infra/docker/docker-compose.yml"), "utf8");
assert.match(compose, /otel-collector/);
assert.match(compose, /promtail/);

console.log("observability verification passed");
