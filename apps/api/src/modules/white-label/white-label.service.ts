import { Inject, Injectable } from "@nestjs/common";
import { WHITE_LABEL_REPOSITORY } from "./white-label.constants.js";
import { UpdateWhiteLabelThemeDto, UpsertEmailTemplateDto, UpsertWhiteLabelAssetDto, WhiteLabelTenantQueryDto } from "./dto/white-label.dto.js";
import { WhiteLabelRepository } from "./white-label.repository.js";

@Injectable()
export class WhiteLabelService {
  constructor(@Inject(WHITE_LABEL_REPOSITORY) private readonly repository: WhiteLabelRepository) {}

  getConfig(query: WhiteLabelTenantQueryDto) {
    return this.repository.getConfig(query);
  }

  updateTheme(dto: UpdateWhiteLabelThemeDto) {
    return this.repository.updateTheme(dto);
  }

  upsertAsset(dto: UpsertWhiteLabelAssetDto) {
    return this.repository.upsertAsset(dto);
  }

  upsertEmailTemplate(dto: UpsertEmailTemplateDto) {
    return this.repository.upsertEmailTemplate(dto);
  }
}
