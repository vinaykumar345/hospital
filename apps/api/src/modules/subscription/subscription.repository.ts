import { CreateSubscriptionPlanDto, TenantSubscriptionDto, UpdateSubscriptionStatusDto } from "./dto/subscription.dto.js";

export interface SubscriptionRepository {
  createPlan(dto: CreateSubscriptionPlanDto): Promise<unknown>;
  listPlans(): Promise<unknown[]>;
  upsertTenantSubscription(dto: TenantSubscriptionDto): Promise<unknown>;
  updateStatus(subscriptionId: string, dto: UpdateSubscriptionStatusDto): Promise<unknown>;
}
