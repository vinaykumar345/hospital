import { Inject, Injectable } from "@nestjs/common";
import { AUDIT_REPOSITORY } from "./audit.constants.js";
import { AuditRepository } from "./audit.repository.js";
import { AuditQueryDto } from "./dto/audit.dto.js";

@Injectable()
export class AuditService {
  constructor(@Inject(AUDIT_REPOSITORY) private readonly repository: AuditRepository) {}

  listEvents(query: AuditQueryDto) {
    return this.repository.listEvents(query);
  }
}
