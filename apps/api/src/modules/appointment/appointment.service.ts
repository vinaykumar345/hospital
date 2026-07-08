import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { APPOINTMENT_REPOSITORY } from "./appointment.constants.js";
import { AppointmentRepository } from "./appointment.repository.js";
import { AppointmentQueryDto, BookAppointmentDto, QueueActionDto, UpdateAppointmentStatusDto } from "./dto/appointment.dto.js";

@Injectable()
export class AppointmentService {
  constructor(@Inject(APPOINTMENT_REPOSITORY) private readonly repository: AppointmentRepository) {}

  book(dto: BookAppointmentDto) {
    return this.repository.book(dto);
  }

  list(query: AppointmentQueryDto) {
    return this.repository.list(query);
  }

  async updateStatus(appointmentId: string, dto: UpdateAppointmentStatusDto) {
    const appointment = await this.repository.updateStatus(appointmentId, dto);
    if (!appointment) {
      throw new NotFoundException("Appointment not found.");
    }
    return appointment;
  }

  enqueue(appointmentId: string, dto: QueueActionDto) {
    return this.repository.enqueue(appointmentId, dto);
  }

  async updateQueue(appointmentId: string, dto: QueueActionDto) {
    const queue = await this.repository.updateQueue(appointmentId, dto);
    if (!queue) {
      throw new NotFoundException("Queue entry not found.");
    }
    return queue;
  }
}
