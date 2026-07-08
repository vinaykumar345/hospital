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
  "apps/api/src/modules/staff/staff.module.ts",
  "apps/api/src/modules/patient/patient.module.ts",
  "apps/api/src/modules/appointment/appointment.module.ts",
  "apps/api/src/modules/dashboard/dashboard.module.ts",
  "apps/api/src/modules/laboratory/laboratory.module.ts",
  "apps/api/src/modules/pharmacy/pharmacy.module.ts",
  "apps/api/src/modules/billing/billing.module.ts",
  "apps/api/src/modules/insurance/insurance.module.ts",
  "apps/api/src/modules/notification/notification.module.ts",
  "apps/api/src/modules/ai-agent/ai-agent.module.ts",
  "apps/api/src/modules/white-label/white-label.module.ts",
  "apps/api/src/modules/subscription/subscription.module.ts",
  "apps/api/src/modules/audit/audit.module.ts",
  "apps/api/migrations/0001_authentication.sql",
  "apps/api/migrations/0002_multi_tenant_hospital_setup.sql",
  "apps/api/migrations/0003_role_based_access_control.sql",
  "apps/api/migrations/0004_hospital_management.sql",
  "apps/api/migrations/0005_staff_management.sql",
  "apps/api/migrations/0006_patient_management.sql",
  "apps/api/migrations/0007_appointment_system.sql",
  "apps/api/migrations/0008_reception_dashboard.sql",
  "apps/api/migrations/0009_doctor_dashboard.sql",
  "apps/api/migrations/0010_nurse_dashboard.sql",
  "apps/api/migrations/0011_laboratory_module.sql",
  "apps/api/migrations/0012_pharmacy_module.sql",
  "apps/api/migrations/0013_billing_module.sql",
  "apps/api/migrations/0014_insurance_module.sql",
  "apps/api/migrations/0015_notification_system.sql",
  "apps/api/migrations/0016_ai_reception_agent.sql",
  "apps/api/migrations/0017_ai_doctor_agent.sql",
  "apps/api/migrations/0018_ai_nurse_agent.sql",
  "apps/api/migrations/0019_ai_patient_assistant.sql",
  "apps/api/migrations/0020_ai_voice_follow_up_agent.sql",
  "apps/api/migrations/0021_admin_analytics_dashboard.sql",
  "apps/api/migrations/0022_white_label_system.sql",
  "apps/api/migrations/0023_subscription_management.sql",
  "apps/api/migrations/0024_audit_logs.sql",
  "apps/api/src/modules/health/health.controller.ts",
  "apps/web/src/main.tsx",
  "apps/mobile/lib/main.dart",
  "infra/docker/docker-compose.yml",
  "infra/docker/otel-collector.yml",
  "infra/k8s/base/api-deployment.yaml",
  "infra/k8s/base/observability-configmap.yaml",
  "infra/k8s/base/web-deployment.yaml",
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
