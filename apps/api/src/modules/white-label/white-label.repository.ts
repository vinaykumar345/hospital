import { UpdateWhiteLabelThemeDto, UpsertEmailTemplateDto, UpsertWhiteLabelAssetDto, WhiteLabelTenantQueryDto } from "./dto/white-label.dto.js";

export interface WhiteLabelRepository {
  getConfig(query: WhiteLabelTenantQueryDto): Promise<unknown>;
  updateTheme(dto: UpdateWhiteLabelThemeDto): Promise<unknown>;
  upsertAsset(dto: UpsertWhiteLabelAssetDto): Promise<unknown>;
  upsertEmailTemplate(dto: UpsertEmailTemplateDto): Promise<unknown>;
}
