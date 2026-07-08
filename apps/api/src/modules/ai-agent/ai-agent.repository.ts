import { ReceptionAgentActionDto, ReceptionAgentRequestDto } from "./dto/ai-agent.dto.js";

export interface AiAgentRepository {
  recordReceptionInteraction(input: ReceptionAgentRequestDto, responseText: string, disclaimer: string): Promise<{ id: string }>;
  recordReceptionAction(input: ReceptionAgentActionDto): Promise<unknown>;
  getQueueSnapshot(tenantId: string): Promise<{ waiting: number; averageWaitMinutes: number }>;
}
