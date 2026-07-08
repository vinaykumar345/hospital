import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import { BillingService } from "./billing.service.js";
import { AddInvoiceLineDto, BillingTenantQueryDto, CreateInvoiceDto, RecordPaymentDto } from "./dto/billing.dto.js";

@ApiTags("billing")
@Controller("billing")
@UseGuards(RbacGuard)
export class BillingController {
  constructor(private readonly billing: BillingService) {}

  @Get("invoices")
  @RequirePermissions("BILLING_MANAGE")
  listInvoices(@Query() query: BillingTenantQueryDto) {
    return this.billing.listInvoices(query);
  }

  @Post("invoices")
  @RequirePermissions("BILLING_MANAGE")
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.billing.createInvoice(dto);
  }

  @Post("invoices/:invoiceId/lines")
  @RequirePermissions("BILLING_MANAGE")
  addLine(@Param("invoiceId") invoiceId: string, @Body() dto: AddInvoiceLineDto) {
    return this.billing.addLine(invoiceId, dto);
  }

  @Post("invoices/:invoiceId/payments")
  @RequirePermissions("BILLING_MANAGE")
  recordPayment(@Param("invoiceId") invoiceId: string, @Body() dto: RecordPaymentDto) {
    return this.billing.recordPayment(invoiceId, dto);
  }
}
