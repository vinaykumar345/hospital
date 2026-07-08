import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class ReceptionAgentRequestDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  patientId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message!: string;
}

export class ReceptionAgentActionDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty()
  @IsUUID()
  interactionId!: string;

  @ApiProperty({ enum: ["BOOK_APPOINTMENT", "ROUTE_DEPARTMENT", "QUEUE_UPDATE", "FAQ_RESPONSE"] })
  @IsIn(["BOOK_APPOINTMENT", "ROUTE_DEPARTMENT", "QUEUE_UPDATE", "FAQ_RESPONSE"])
  actionType!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  payloadJson!: string;
}

export class DoctorAgentDraftDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty()
  @IsUUID()
  doctorUserId!: string;

  @ApiProperty()
  @IsUUID()
  patientId!: string;

  @ApiProperty({ enum: ["PATIENT_SUMMARY", "CONSULTATION_NOTE", "DIFFERENTIAL_SUGGESTIONS", "MEDICATION_INTERACTIONS", "REFERRAL_LETTER", "DISCHARGE_SUMMARY", "FOLLOW_UP_PLAN"] })
  @IsIn(["PATIENT_SUMMARY", "CONSULTATION_NOTE", "DIFFERENTIAL_SUGGESTIONS", "MEDICATION_INTERACTIONS", "REFERRAL_LETTER", "DISCHARGE_SUMMARY", "FOLLOW_UP_PLAN"])
  outputType!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clinicalContext!: string;
}

export class NurseAgentDraftDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty()
  @IsUUID()
  nurseUserId!: string;

  @ApiProperty()
  @IsUUID()
  patientId!: string;

  @ApiProperty({ enum: ["SHIFT_HANDOVER", "MEDICATION_SCHEDULE", "NURSING_TASKS", "VITAL_SIGNS_NOTE", "OBSERVATION_LOG"] })
  @IsIn(["SHIFT_HANDOVER", "MEDICATION_SCHEDULE", "NURSING_TASKS", "VITAL_SIGNS_NOTE", "OBSERVATION_LOG"])
  outputType!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nursingContext!: string;
}

export class PatientAssistantRequestDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty()
  @IsUUID()
  patientId!: string;

  @ApiProperty({ enum: ["HOSPITAL_FAQ", "REPORT_EXPLANATION", "PATIENT_EDUCATION", "APPOINTMENT_RECOMMENDATION", "FOLLOW_UP_REMINDER"] })
  @IsIn(["HOSPITAL_FAQ", "REPORT_EXPLANATION", "PATIENT_EDUCATION", "APPOINTMENT_RECOMMENDATION", "FOLLOW_UP_REMINDER"])
  requestType!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message!: string;
}

export class VoiceFollowUpCampaignDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ enum: ["POST_VISIT", "MEDICATION_ADHERENCE", "LAB_FOLLOW_UP", "APPOINTMENT_REMINDER"] })
  @IsIn(["POST_VISIT", "MEDICATION_ADHERENCE", "LAB_FOLLOW_UP", "APPOINTMENT_REMINDER"])
  campaignType!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reviewedScript!: string;
}

export class QueueVoiceFollowUpCallDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;

  @ApiProperty()
  @IsUUID()
  campaignId!: string;

  @ApiProperty()
  @IsUUID()
  patientId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;
}
