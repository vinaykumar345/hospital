import {
  DoctorAgentDraftDto,
  NurseAgentDraftDto,
  PatientAssistantRequestDto,
  ReceptionAgentActionDto,
  ReceptionAgentRequestDto
} from "./dto/ai-agent.dto.js";

export interface AiAgentRepository {
  recordReceptionInteraction(input: ReceptionAgentRequestDto, responseText: string, disclaimer: string): Promise<{ id: string }>;
  recordReceptionAction(input: ReceptionAgentActionDto): Promise<unknown>;
  getQueueSnapshot(tenantId: string): Promise<{ waiting: number; averageWaitMinutes: number }>;
  recordDoctorDraft(input: DoctorAgentDraftDto, draftText: string, disclaimer: string): Promise<unknown>;
  recordNurseDraft(input: NurseAgentDraftDto, draftText: string, disclaimer: string): Promise<unknown>;
  recordPatientAssistantResponse(input: PatientAssistantRequestDto, responseText: string, disclaimer: string): Promise<unknown>;
}
