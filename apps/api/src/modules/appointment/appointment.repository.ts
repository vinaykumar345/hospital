import { AppointmentQueryDto, BookAppointmentDto, QueueActionDto, UpdateAppointmentStatusDto } from "./dto/appointment.dto.js";

export interface AppointmentRepository {
  book(dto: BookAppointmentDto): Promise<unknown>;
  list(query: AppointmentQueryDto): Promise<unknown[]>;
  updateStatus(appointmentId: string, dto: UpdateAppointmentStatusDto): Promise<unknown>;
  enqueue(appointmentId: string, dto: QueueActionDto): Promise<unknown>;
  updateQueue(appointmentId: string, dto: QueueActionDto): Promise<unknown>;
}
