import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { PostgresSubscriptionRepository } from "./postgres-subscription.repository.js";
import { SUBSCRIPTION_REPOSITORY } from "./subscription.constants.js";
import { SubscriptionController } from "./subscription.controller.js";
import { SubscriptionService } from "./subscription.service.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [SubscriptionController],
  providers: [
    SubscriptionService,
    PostgresSubscriptionRepository,
    {
      provide: SUBSCRIPTION_REPOSITORY,
      useExisting: PostgresSubscriptionRepository
    }
  ]
})
export class SubscriptionModule {}
