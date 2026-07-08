import { CreateTemplateDto, NotificationTenantQueryDto, QueueNotificationDto, UpdatePreferenceDto } from "./dto/notification.dto.js";

export interface NotificationRepository {
  createTemplate(dto: CreateTemplateDto): Promise<unknown>;
  listTemplates(query: NotificationTenantQueryDto): Promise<unknown[]>;
  queue(dto: QueueNotificationDto): Promise<unknown>;
  listQueued(query: NotificationTenantQueryDto): Promise<unknown[]>;
  updatePreference(dto: UpdatePreferenceDto): Promise<unknown>;
}
