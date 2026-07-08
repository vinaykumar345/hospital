import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import { UpdateWhiteLabelThemeDto, UpsertEmailTemplateDto, UpsertWhiteLabelAssetDto, WhiteLabelTenantQueryDto } from "./dto/white-label.dto.js";
import { WhiteLabelService } from "./white-label.service.js";

@ApiTags("white-label")
@Controller("white-label")
@UseGuards(RbacGuard)
export class WhiteLabelController {
  constructor(private readonly whiteLabel: WhiteLabelService) {}

  @Get("config")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  getConfig(@Query() query: WhiteLabelTenantQueryDto) {
    return this.whiteLabel.getConfig(query);
  }

  @Put("theme")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  updateTheme(@Body() dto: UpdateWhiteLabelThemeDto) {
    return this.whiteLabel.updateTheme(dto);
  }

  @Post("assets")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  upsertAsset(@Body() dto: UpsertWhiteLabelAssetDto) {
    return this.whiteLabel.upsertAsset(dto);
  }

  @Post("email-templates")
  @RequirePermissions("HOSPITAL_PROFILE_MANAGE")
  upsertEmailTemplate(@Body() dto: UpsertEmailTemplateDto) {
    return this.whiteLabel.upsertEmailTemplate(dto);
  }
}
