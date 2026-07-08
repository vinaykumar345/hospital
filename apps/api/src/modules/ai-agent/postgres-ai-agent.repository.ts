import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import { DoctorAgentDraftDto, NurseAgentDraftDto, ReceptionAgentActionDto, ReceptionAgentRequestDto } from "./dto/ai-agent.dto.js";
import { AiAgentRepository } from "./ai-agent.repository.js";

@Injectable()
export class PostgresAiAgentRepository implements AiAgentRepository {
  constructor(private readonly postgres: PostgresService) {}

  async recordReceptionInteraction(input: ReceptionAgentRequestDto, responseText: string, disclaimer: string) {
    const result = await this.postgres.query<{ id: string }>(
      `insert into ai_agent_interactions (tenant_id, patient_id, agent_type, user_message, response_text, disclaimer)
       values ($1, $2, 'RECEPTION', $3, $4, $5)
       returning id`,
      [input.tenantId, input.patientId ?? null, input.message, responseText, disclaimer]
    );
    return result.rows[0];
  }

  async recordReceptionAction(input: ReceptionAgentActionDto) {
    const result = await this.postgres.query(
      `insert into reception_agent_actions (tenant_id, interaction_id, action_type, payload)
       values ($1, $2, $3, $4::jsonb) returning *`,
      [input.tenantId, input.interactionId, input.actionType, input.payloadJson]
    );
    return result.rows[0];
  }

  async getQueueSnapshot(tenantId: string) {
    const result = await this.postgres.query<{ waiting: string; average_wait_minutes: string | null }>(
      `select
        count(*) filter (where queue_status = 'WAITING')::text as waiting,
        coalesce(avg(estimated_wait_minutes), 0)::text as average_wait_minutes
       from appointment_queue
       where tenant_id = $1`,
      [tenantId]
    );
    return {
      waiting: Number(result.rows[0]?.waiting ?? 0),
      averageWaitMinutes: Number(result.rows[0]?.average_wait_minutes ?? 0)
    };
  }

  async recordDoctorDraft(input: DoctorAgentDraftDto, draftText: string, disclaimer: string) {
    const interaction = await this.postgres.query<{ id: string }>(
      `insert into ai_agent_interactions (tenant_id, patient_id, agent_type, user_message, response_text, disclaimer)
       values ($1, $2, 'DOCTOR', $3, $4, $5)
       returning id`,
      [input.tenantId, input.patientId, input.clinicalContext, draftText, disclaimer]
    );

    const result = await this.postgres.query(
      `insert into doctor_agent_outputs (tenant_id, interaction_id, doctor_user_id, patient_id, output_type, draft_text, disclaimer)
       values ($1, $2, $3, $4, $5, $6, $7)
       returning *`,
      [input.tenantId, interaction.rows[0].id, input.doctorUserId, input.patientId, input.outputType, draftText, disclaimer]
    );
    return result.rows[0];
  }

  async recordNurseDraft(input: NurseAgentDraftDto, draftText: string, disclaimer: string) {
    const interaction = await this.postgres.query<{ id: string }>(
      `insert into ai_agent_interactions (tenant_id, patient_id, agent_type, user_message, response_text, disclaimer)
       values ($1, $2, 'NURSE', $3, $4, $5)
       returning id`,
      [input.tenantId, input.patientId, input.nursingContext, draftText, disclaimer]
    );

    const result = await this.postgres.query(
      `insert into nurse_agent_outputs (tenant_id, interaction_id, nurse_user_id, patient_id, output_type, draft_text, disclaimer)
       values ($1, $2, $3, $4, $5, $6, $7)
       returning *`,
      [input.tenantId, interaction.rows[0].id, input.nurseUserId, input.patientId, input.outputType, draftText, disclaimer]
    );
    return result.rows[0];
  }
}
