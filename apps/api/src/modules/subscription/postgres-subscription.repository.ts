import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import { CreateSubscriptionPlanDto, TenantSubscriptionDto, UpdateSubscriptionStatusDto } from "./dto/subscription.dto.js";
import { SubscriptionRepository } from "./subscription.repository.js";

@Injectable()
export class PostgresSubscriptionRepository implements SubscriptionRepository {
  constructor(private readonly postgres: PostgresService) {}

  async createPlan(dto: CreateSubscriptionPlanDto) {
    const result = await this.postgres.query(
      `insert into subscription_plans (code, name, monthly_price)
       values (upper($1), $2, $3)
       on conflict (code) do update set name = excluded.name, monthly_price = excluded.monthly_price, updated_at = now()
       returning *`,
      [dto.code, dto.name, dto.monthlyPrice]
    );
    return result.rows[0];
  }

  async listPlans() {
    const result = await this.postgres.query(`select * from subscription_plans where active = true order by monthly_price`);
    return result.rows;
  }

  async upsertTenantSubscription(dto: TenantSubscriptionDto) {
    const result = await this.postgres.query(
      `insert into tenant_subscriptions (tenant_id, plan_id, billing_interval, provider_customer_id)
       values ($1, $2, $3, $4)
       on conflict (tenant_id) do update set
         plan_id = excluded.plan_id,
         billing_interval = excluded.billing_interval,
         provider_customer_id = coalesce(excluded.provider_customer_id, tenant_subscriptions.provider_customer_id),
         status = 'ACTIVE',
         updated_at = now()
       returning *`,
      [dto.tenantId, dto.planId, dto.billingInterval, dto.providerCustomerId ?? null]
    );
    return result.rows[0];
  }

  async updateStatus(subscriptionId: string, dto: UpdateSubscriptionStatusDto) {
    const result = await this.postgres.query(
      `update tenant_subscriptions set status = $3, updated_at = now() where id = $1 and tenant_id = $2 returning *`,
      [subscriptionId, dto.tenantId, dto.status]
    );
    return result.rows[0] ?? null;
  }
}
