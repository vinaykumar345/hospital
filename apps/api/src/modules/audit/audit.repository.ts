import { AuditQueryDto } from "./dto/audit.dto.js";

export interface AuditRepository {
  listEvents(query: AuditQueryDto): Promise<unknown[]>;
}
