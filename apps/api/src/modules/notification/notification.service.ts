import { Inject, Injectable } from "@nestjs/common";
import { NOTIFICATION_REPOSITORY } from "./notification.constants.js";
import { NotificationRepository } from "./notification.repository.js";
import { CreateTemplateDto, NotificationTenantQueryDto, QueueNotificationDto, UpdatePreferenceDto } from "./dto/notification.dto.js";

@Injectable()
export class NotificationService {
  constructor(@Inject(NOTIFICATION_REPOSITORY) private readonly repository: NotificationRepository) {}

  createTemplate(dto: CreateTemplateDto) {
    return this.repository.createTemplate(dto);
  }

  listTemplates(query: NotificationTenantQueryDto) {
    return this.repository.listTemplates(query);
  }

  queue(dto: QueueNotificationDto) {
    return this.repository.queue(dto);
  }

  listQueued(query: NotificationTenantQueryDto) {
    return this.repository.listQueued(query);
  }

  updatePreference(dto: UpdatePreferenceDto) {
    return this.repository.updatePreference(dto);
  }
}
