import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { SUBSCRIPTION_REPOSITORY } from "./subscription.constants.js";
import { CreateSubscriptionPlanDto, TenantSubscriptionDto, UpdateSubscriptionStatusDto } from "./dto/subscription.dto.js";
import { SubscriptionRepository } from "./subscription.repository.js";

@Injectable()
export class SubscriptionService {
  constructor(@Inject(SUBSCRIPTION_REPOSITORY) private readonly repository: SubscriptionRepository) {}

  createPlan(dto: CreateSubscriptionPlanDto) {
    return this.repository.createPlan(dto);
  }

  listPlans() {
    return this.repository.listPlans();
  }

  upsertTenantSubscription(dto: TenantSubscriptionDto) {
    return this.repository.upsertTenantSubscription(dto);
  }

  async updateStatus(subscriptionId: string, dto: UpdateSubscriptionStatusDto) {
    const subscription = await this.repository.updateStatus(subscriptionId, dto);
    if (!subscription) throw new NotFoundException("Subscription not found.");
    return subscription;
  }
}
