import { Inject, Injectable } from "@nestjs/common";
import { BILLING_REPOSITORY } from "./billing.constants.js";
import { BillingRepository } from "./billing.repository.js";
import { AddInvoiceLineDto, BillingTenantQueryDto, CreateInvoiceDto, RecordPaymentDto } from "./dto/billing.dto.js";

@Injectable()
export class BillingService {
  constructor(@Inject(BILLING_REPOSITORY) private readonly repository: BillingRepository) {}

  createInvoice(dto: CreateInvoiceDto) {
    return this.repository.createInvoice(dto);
  }

  listInvoices(query: BillingTenantQueryDto) {
    return this.repository.listInvoices(query);
  }

  addLine(invoiceId: string, dto: AddInvoiceLineDto) {
    return this.repository.addLine(invoiceId, dto);
  }

  recordPayment(invoiceId: string, dto: RecordPaymentDto) {
    return this.repository.recordPayment(invoiceId, dto);
  }
}
