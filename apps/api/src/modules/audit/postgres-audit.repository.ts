import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import { AuditRepository } from "./audit.repository.js";
import { AuditQueryDto } from "./dto/audit.dto.js";

@Injectable()
export class PostgresAuditRepository implements AuditRepository {
  constructor(private readonly postgres: PostgresService) {}

  async listEvents(query: AuditQueryDto) {
    const result = await this.postgres.query(
      `select *
       from audit_events
       where tenant_id = $1
         and ($2::text is null or event_type = $2)
         and ($3::uuid is null or actor_user_id = $3::uuid)
       order by created_at desc
       limit 500`,
      [query.tenantId, query.eventType ?? null, query.actorUserId ?? null]
    );
    return result.rows;
  }
}
