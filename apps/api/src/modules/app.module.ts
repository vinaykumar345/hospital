import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module.js";
import { AiAgentModule } from "./ai-agent/ai-agent.module.js";
import { AppointmentModule } from "./appointment/appointment.module.js";
import { AuditModule } from "./audit/audit.module.js";
import { BillingModule } from "./billing/billing.module.js";
import { DashboardModule } from "./dashboard/dashboard.module.js";
import { HealthModule } from "./health/health.module.js";
import { HospitalModule } from "./hospital/hospital.module.js";
import { InsuranceModule } from "./insurance/insurance.module.js";
import { LaboratoryModule } from "./laboratory/laboratory.module.js";
import { NotificationModule } from "./notification/notification.module.js";
import { PatientModule } from "./patient/patient.module.js";
import { PharmacyModule } from "./pharmacy/pharmacy.module.js";
import { RbacModule } from "./rbac/rbac.module.js";
import { StaffModule } from "./staff/staff.module.js";
import { SubscriptionModule } from "./subscription/subscription.module.js";
import { TenancyModule } from "./tenancy/tenancy.module.js";
import { WhiteLabelModule } from "./white-label/white-label.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AiAgentModule,
    AppointmentModule,
    AuditModule,
    AuthModule,
    BillingModule,
    DashboardModule,
    HealthModule,
    HospitalModule,
    InsuranceModule,
    LaboratoryModule,
    NotificationModule,
    PatientModule,
    PharmacyModule,
    RbacModule,
    StaffModule,
    SubscriptionModule,
    TenancyModule,
    WhiteLabelModule
  ]
})
export class AppModule {}
