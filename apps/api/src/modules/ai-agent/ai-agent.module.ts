import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { AI_AGENT_REPOSITORY } from "./ai-agent.constants.js";
import { AiAgentController } from "./ai-agent.controller.js";
import { AiAgentService } from "./ai-agent.service.js";
import { PostgresAiAgentRepository } from "./postgres-ai-agent.repository.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [AiAgentController],
  providers: [
    AiAgentService,
    PostgresAiAgentRepository,
    {
      provide: AI_AGENT_REPOSITORY,
      useExisting: PostgresAiAgentRepository
    }
  ]
})
export class AiAgentModule {}
