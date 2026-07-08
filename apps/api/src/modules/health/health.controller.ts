import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AI_REVIEW_DISCLAIMER } from "@hospital/shared";

@ApiTags("health")
@Controller("health")
export class HealthController {
  @Get()
  @ApiOkResponse({ description: "Service health status." })
  getHealth() {
    return {
      status: "ok",
      service: "ai-hospital-assistant-api",
      aiDisclaimer: AI_REVIEW_DISCLAIMER
    };
  }
}
