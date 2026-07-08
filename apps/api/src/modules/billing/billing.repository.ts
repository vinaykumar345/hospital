import { AddInvoiceLineDto, BillingTenantQueryDto, CreateInvoiceDto, RecordPaymentDto } from "./dto/billing.dto.js";

export interface BillingRepository {
  createInvoice(dto: CreateInvoiceDto): Promise<unknown>;
  listInvoices(query: BillingTenantQueryDto): Promise<unknown[]>;
  addLine(invoiceId: string, dto: AddInvoiceLineDto): Promise<unknown>;
  recordPayment(invoiceId: string, dto: RecordPaymentDto): Promise<unknown>;
}
