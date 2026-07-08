import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import { CreateTemplateDto, NotificationTenantQueryDto, QueueNotificationDto, UpdatePreferenceDto } from "./dto/notification.dto.js";
import { NotificationRepository } from "./notification.repository.js";

@Injectable()
export class PostgresNotificationRepository implements NotificationRepository {
  constructor(private readonly postgres: PostgresService) {}

  async createTemplate(dto: CreateTemplateDto) {
    const result = await this.postgres.query(
      `insert into notification_templates (tenant_id, code, channel, body)
       values ($1, upper($2), $3, $4)
       on conflict (tenant_id, code, channel) do update set body = excluded.body, updated_at = now()
       returning *`,
      [dto.tenantId, dto.code, dto.channel, dto.body]
    );
    return result.rows[0];
  }

  async listTemplates(query: NotificationTenantQueryDto) {
    const result = await this.postgres.query(`select * from notification_templates where tenant_id = $1 order by code`, [query.tenantId]);
    return result.rows;
  }

  async queue(dto: QueueNotificationDto) {
    const result = await this.postgres.query(
      `insert into notification_deliveries (tenant_id, channel, recipient, template_code, payload)
       values ($1, $2, $3, upper($4), coalesce($5::jsonb, '{}'::jsonb)) returning *`,
      [dto.tenantId, dto.channel, dto.recipient, dto.templateCode, dto.payloadJson ?? null]
    );
    return result.rows[0];
  }

  async listQueued(query: NotificationTenantQueryDto) {
    const result = await this.postgres.query(
      `select * from notification_deliveries where tenant_id = $1 order by created_at desc limit 200`,
      [query.tenantId]
    );
    return result.rows;
  }

  async updatePreference(dto: UpdatePreferenceDto) {
    const result = await this.postgres.query(
      `insert into notification_preferences (tenant_id, user_id, channel, status)
       values ($1, $2, $3, $4)
       on conflict (tenant_id, user_id, channel) do update set status = excluded.status, updated_at = now()
       returning *`,
      [dto.tenantId, dto.userId, dto.channel, dto.status]
    );
    return result.rows[0];
  }
}
