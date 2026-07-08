import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import { AiAgentService } from "./ai-agent.service.js";
import {
  DoctorAgentDraftDto,
  NurseAgentDraftDto,
  PatientAssistantRequestDto,
  ReceptionAgentActionDto,
  ReceptionAgentRequestDto
} from "./dto/ai-agent.dto.js";

@ApiTags("ai-agents")
@Controller("ai-agents")
@UseGuards(RbacGuard)
export class AiAgentController {
  constructor(private readonly aiAgents: AiAgentService) {}

  @Post("reception/respond")
  @RequirePermissions("AI_AGENT_USE")
  receptionRespond(@Body() dto: ReceptionAgentRequestDto) {
    return this.aiAgents.receptionRespond(dto);
  }

  @Post("reception/actions")
  @RequirePermissions("AI_AGENT_USE")
  recordReceptionAction(@Body() dto: ReceptionAgentActionDto) {
    return this.aiAgents.recordReceptionAction(dto);
  }

  @Post("doctor/draft")
  @RequirePermissions("AI_AGENT_USE")
  doctorDraft(@Body() dto: DoctorAgentDraftDto) {
    return this.aiAgents.doctorDraft(dto);
  }

  @Post("nurse/draft")
  @RequirePermissions("AI_AGENT_USE")
  nurseDraft(@Body() dto: NurseAgentDraftDto) {
    return this.aiAgents.nurseDraft(dto);
  }

  @Post("patient/respond")
  @RequirePermissions("AI_AGENT_USE")
  patientAssistant(@Body() dto: PatientAssistantRequestDto) {
    return this.aiAgents.patientAssistant(dto);
  }
}
