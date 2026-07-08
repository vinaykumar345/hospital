import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module.js";
import { AppointmentModule } from "./appointment/appointment.module.js";
import { HealthModule } from "./health/health.module.js";
import { HospitalModule } from "./hospital/hospital.module.js";
import { PatientModule } from "./patient/patient.module.js";
import { RbacModule } from "./rbac/rbac.module.js";
import { StaffModule } from "./staff/staff.module.js";
import { TenancyModule } from "./tenancy/tenancy.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AppointmentModule,
    AuthModule,
    HealthModule,
    HospitalModule,
    PatientModule,
    RbacModule,
    StaffModule,
    TenancyModule
  ]
})
export class AppModule {}
