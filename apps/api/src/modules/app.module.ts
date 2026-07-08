import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module.js";
import { HealthModule } from "./health/health.module.js";
import { HospitalModule } from "./hospital/hospital.module.js";
import { RbacModule } from "./rbac/rbac.module.js";
import { TenancyModule } from "./tenancy/tenancy.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    HealthModule,
    HospitalModule,
    RbacModule,
    TenancyModule
  ]
})
export class AppModule {}
