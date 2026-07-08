import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { NOTIFICATION_REPOSITORY } from "./notification.constants.js";
import { NotificationController } from "./notification.controller.js";
import { NotificationService } from "./notification.service.js";
import { PostgresNotificationRepository } from "./postgres-notification.repository.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    PostgresNotificationRepository,
    {
      provide: NOTIFICATION_REPOSITORY,
      useExisting: PostgresNotificationRepository
    }
  ]
})
export class NotificationModule {}
