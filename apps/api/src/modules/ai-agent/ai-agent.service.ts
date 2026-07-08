import { Inject, Injectable } from "@nestjs/common";
import { AI_REVIEW_DISCLAIMER } from "@hospital/shared";
import { AI_AGENT_REPOSITORY } from "./ai-agent.constants.js";
import { AiAgentRepository } from "./ai-agent.repository.js";
import {
  DoctorAgentDraftDto,
  NurseAgentDraftDto,
  PatientAssistantRequestDto,
  ReceptionAgentActionDto,
  ReceptionAgentRequestDto
} from "./dto/ai-agent.dto.js";

@Injectable()
export class AiAgentService {
  constructor(@Inject(AI_AGENT_REPOSITORY) private readonly repository: AiAgentRepository) {}

  async receptionRespond(dto: ReceptionAgentRequestDto) {
    const lower = dto.message.toLowerCase();
    const queue = await this.repository.getQueueSnapshot(dto.tenantId);

    let responseText = "I can help with appointments, department directions, FAQs, and queue information.";
    let suggestedAction = "FAQ_RESPONSE";

    if (lower.includes("appointment") || lower.includes("book")) {
      responseText = "I can prepare an appointment booking request. A staff member should confirm doctor availability before final booking.";
      suggestedAction = "BOOK_APPOINTMENT";
    } else if (lower.includes("wait") || lower.includes("queue")) {
      responseText = `There are ${queue.waiting} patients waiting. The estimated wait is about ${queue.averageWaitMinutes} minutes.`;
      suggestedAction = "QUEUE_UPDATE";
    } else if (lower.includes("department") || lower.includes("where")) {
      responseText = "I can direct the patient to the appropriate department based on hospital routing rules.";
      suggestedAction = "ROUTE_DEPARTMENT";
    }

    const interaction = await this.repository.recordReceptionInteraction(dto, responseText, AI_REVIEW_DISCLAIMER);

    return {
      interactionId: interaction.id,
      responseText,
      suggestedAction,
      disclaimer: AI_REVIEW_DISCLAIMER
    };
  }

  recordReceptionAction(dto: ReceptionAgentActionDto) {
    return this.repository.recordReceptionAction(dto);
  }

  doctorDraft(dto: DoctorAgentDraftDto) {
    const draftText = this.createDoctorDraft(dto.outputType, dto.clinicalContext);
    return this.repository.recordDoctorDraft(dto, draftText, AI_REVIEW_DISCLAIMER);
  }

  nurseDraft(dto: NurseAgentDraftDto) {
    const draftText = `Draft for nurse review only. ${dto.outputType.replaceAll("_", " ").toLowerCase()} based on provided nursing context: ${dto.nursingContext}`;
    return this.repository.recordNurseDraft(dto, draftText, AI_REVIEW_DISCLAIMER);
  }

  patientAssistant(dto: PatientAssistantRequestDto) {
    const responseText =
      `Patient assistant response for ${dto.requestType.replaceAll("_", " ").toLowerCase()}: ${dto.message}. ` +
      "This is general hospital support information, not a diagnosis or treatment decision. Please contact a licensed clinician for medical advice.";
    return this.repository.recordPatientAssistantResponse(dto, responseText, AI_REVIEW_DISCLAIMER);
  }

  private createDoctorDraft(outputType: string, clinicalContext: string): string {
    const prefix = "Draft for clinician review only.";
    if (outputType === "DIFFERENTIAL_SUGGESTIONS") {
      return `${prefix} Possible differential diagnoses are suggestions only and must be confirmed or rejected by a licensed clinician. Context considered: ${clinicalContext}`;
    }
    if (outputType === "MEDICATION_INTERACTIONS") {
      return `${prefix} Potential medication interaction highlights require pharmacist or clinician verification. Context considered: ${clinicalContext}`;
    }
    return `${prefix} ${outputType.replaceAll("_", " ").toLowerCase()} based on provided clinical context: ${clinicalContext}`;
  }
}
