import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { APPOINTMENT_REPOSITORY } from "./appointment.constants.js";
import { AppointmentController } from "./appointment.controller.js";
import { AppointmentService } from "./appointment.service.js";
import { PostgresAppointmentRepository } from "./postgres-appointment.repository.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    PostgresAppointmentRepository,
    {
      provide: APPOINTMENT_REPOSITORY,
      useExisting: PostgresAppointmentRepository
    }
  ]
})
export class AppointmentModule {}
