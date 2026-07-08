import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import { CreateSubscriptionPlanDto, TenantSubscriptionDto, UpdateSubscriptionStatusDto } from "./dto/subscription.dto.js";
import { SubscriptionService } from "./subscription.service.js";

@ApiTags("subscriptions")
@Controller("subscriptions")
@UseGuards(RbacGuard)
export class SubscriptionController {
  constructor(private readonly subscriptions: SubscriptionService) {}

  @Get("plans")
  @RequirePermissions("TENANT_MANAGE")
  listPlans() {
    return this.subscriptions.listPlans();
  }

  @Post("plans")
  @RequirePermissions("TENANT_MANAGE")
  createPlan(@Body() dto: CreateSubscriptionPlanDto) {
    return this.subscriptions.createPlan(dto);
  }

  @Post("tenant")
  @RequirePermissions("TENANT_MANAGE")
  upsertTenantSubscription(@Body() dto: TenantSubscriptionDto) {
    return this.subscriptions.upsertTenantSubscription(dto);
  }

  @Patch(":subscriptionId/status")
  @RequirePermissions("TENANT_MANAGE")
  updateStatus(@Param("subscriptionId") subscriptionId: string, @Body() dto: UpdateSubscriptionStatusDto) {
    return this.subscriptions.updateStatus(subscriptionId, dto);
  }
}
