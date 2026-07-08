import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import { CreateTemplateDto, NotificationTenantQueryDto, QueueNotificationDto, UpdatePreferenceDto } from "./dto/notification.dto.js";
import { NotificationService } from "./notification.service.js";

@ApiTags("notifications")
@Controller("notifications")
@UseGuards(RbacGuard)
export class NotificationController {
  constructor(private readonly notifications: NotificationService) {}

  @Get("templates")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  listTemplates(@Query() query: NotificationTenantQueryDto) {
    return this.notifications.listTemplates(query);
  }

  @Post("templates")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  createTemplate(@Body() dto: CreateTemplateDto) {
    return this.notifications.createTemplate(dto);
  }

  @Get("deliveries")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  listQueued(@Query() query: NotificationTenantQueryDto) {
    return this.notifications.listQueued(query);
  }

  @Post("deliveries")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  queue(@Body() dto: QueueNotificationDto) {
    return this.notifications.queue(dto);
  }

  @Post("preferences")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  updatePreference(@Body() dto: UpdatePreferenceDto) {
    return this.notifications.updatePreference(dto);
  }
}
