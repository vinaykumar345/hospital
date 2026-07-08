import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import { AddInvoiceLineDto, BillingTenantQueryDto, CreateInvoiceDto, RecordPaymentDto } from "./dto/billing.dto.js";
import { BillingRepository } from "./billing.repository.js";

@Injectable()
export class PostgresBillingRepository implements BillingRepository {
  constructor(private readonly postgres: PostgresService) {}

  async createInvoice(dto: CreateInvoiceDto) {
    const result = await this.postgres.query(
      `insert into invoices (tenant_id, patient_id) values ($1, $2) returning *`,
      [dto.tenantId, dto.patientId]
    );
    return result.rows[0];
  }

  async listInvoices(query: BillingTenantQueryDto) {
    const result = await this.postgres.query(
      `select i.*, p.full_name as patient_name
       from invoices i
       join patients p on p.id = i.patient_id
       where i.tenant_id = $1
       order by i.created_at desc
       limit 200`,
      [query.tenantId]
    );
    return result.rows;
  }

  async addLine(invoiceId: string, dto: AddInvoiceLineDto) {
    const taxableAmount = Math.max(dto.amount - dto.discountAmount, 0);
    const gstAmount = taxableAmount * (dto.gstRate / 100);
    const result = await this.postgres.query(
      `insert into invoice_lines
        (tenant_id, invoice_id, line_type, description, amount, gst_rate, gst_amount, discount_amount, total_amount)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       returning *`,
      [dto.tenantId, invoiceId, dto.lineType, dto.description, dto.amount, dto.gstRate, gstAmount, dto.discountAmount, taxableAmount + gstAmount]
    );
    await this.recalculateInvoice(invoiceId, dto.tenantId);
    return result.rows[0];
  }

  async recordPayment(invoiceId: string, dto: RecordPaymentDto) {
    const result = await this.postgres.query(
      `insert into invoice_payments (tenant_id, invoice_id, amount, method, gateway_reference)
       values ($1, $2, $3, $4, $5) returning *`,
      [dto.tenantId, invoiceId, dto.amount, dto.method, dto.gatewayReference ?? null]
    );
    await this.recalculateInvoice(invoiceId, dto.tenantId);
    return result.rows[0];
  }

  private async recalculateInvoice(invoiceId: string, tenantId: string) {
    await this.postgres.query(
      `with totals as (
         select
           coalesce(sum(total_amount), 0) as invoice_total,
           coalesce(sum(discount_amount), 0) as discount_total,
           coalesce(sum(gst_amount), 0) as gst_total
         from invoice_lines where invoice_id = $1 and tenant_id = $2
       ), paid as (
         select coalesce(sum(amount), 0) as paid_total from invoice_payments where invoice_id = $1 and tenant_id = $2
       )
       update invoices
       set total_amount = totals.invoice_total,
           discount_amount = totals.discount_total,
           gst_amount = totals.gst_total,
           paid_amount = paid.paid_total,
           status = case
             when paid.paid_total >= totals.invoice_total and totals.invoice_total > 0 then 'PAID'
             when paid.paid_total > 0 then 'PARTIALLY_PAID'
             else status
           end,
           updated_at = now()
       from totals, paid
       where invoices.id = $1 and invoices.tenant_id = $2`,
      [invoiceId, tenantId]
    );
  }
}
