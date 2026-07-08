import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import { AppointmentService } from "./appointment.service.js";
import { AppointmentQueryDto, BookAppointmentDto, QueueActionDto, UpdateAppointmentStatusDto } from "./dto/appointment.dto.js";

@ApiTags("appointments")
@Controller("appointments")
@UseGuards(RbacGuard)
export class AppointmentController {
  constructor(private readonly appointments: AppointmentService) {}

  @Get()
  @RequirePermissions("APPOINTMENT_READ")
  list(@Query() query: AppointmentQueryDto) {
    return this.appointments.list(query);
  }

  @Post()
  @RequirePermissions("APPOINTMENT_WRITE")
  book(@Body() dto: BookAppointmentDto) {
    return this.appointments.book(dto);
  }

  @Patch(":appointmentId/status")
  @RequirePermissions("APPOINTMENT_WRITE")
  updateStatus(@Param("appointmentId") appointmentId: string, @Body() dto: UpdateAppointmentStatusDto) {
    return this.appointments.updateStatus(appointmentId, dto);
  }

  @Post(":appointmentId/queue")
  @RequirePermissions("APPOINTMENT_WRITE")
  enqueue(@Param("appointmentId") appointmentId: string, @Body() dto: QueueActionDto) {
    return this.appointments.enqueue(appointmentId, dto);
  }

  @Patch(":appointmentId/queue")
  @RequirePermissions("APPOINTMENT_WRITE")
  updateQueue(@Param("appointmentId") appointmentId: string, @Body() dto: QueueActionDto) {
    return this.appointments.updateQueue(appointmentId, dto);
  }
}
