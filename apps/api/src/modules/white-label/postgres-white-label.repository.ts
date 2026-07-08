import { Injectable } from "@nestjs/common";
import { PostgresService } from "../../common/database/postgres.service.js";
import { UpdateWhiteLabelThemeDto, UpsertEmailTemplateDto, UpsertWhiteLabelAssetDto, WhiteLabelTenantQueryDto } from "./dto/white-label.dto.js";
import { WhiteLabelRepository } from "./white-label.repository.js";

@Injectable()
export class PostgresWhiteLabelRepository implements WhiteLabelRepository {
  constructor(private readonly postgres: PostgresService) {}

  async getConfig(query: WhiteLabelTenantQueryDto) {
    const theme = await this.postgres.query(`select * from tenant_branding where tenant_id = $1`, [query.tenantId]);
    const assets = await this.postgres.query(`select * from white_label_assets where tenant_id = $1 order by asset_type`, [query.tenantId]);
    const templates = await this.postgres.query(`select * from white_label_email_templates where tenant_id = $1 order by template_code`, [query.tenantId]);
    return { theme: theme.rows[0] ?? null, assets: assets.rows, emailTemplates: templates.rows };
  }

  async updateTheme(dto: UpdateWhiteLabelThemeDto) {
    const result = await this.postgres.query(
      `insert into tenant_branding (tenant_id, logo_url, primary_color, secondary_color, mobile_app_name)
       values ($1, $2, $3, $4, 'AI Hospital Assistant')
       on conflict (tenant_id) do update set
         logo_url = coalesce(excluded.logo_url, tenant_branding.logo_url),
         primary_color = excluded.primary_color,
         secondary_color = excluded.secondary_color,
         updated_at = now()
       returning *`,
      [dto.tenantId, dto.logoUrl ?? null, dto.primaryColor, dto.secondaryColor]
    );
    await this.postgres.query(
      `insert into white_label_theme_extensions (tenant_id, accent_color)
       values ($1, $2)
       on conflict (tenant_id) do update set accent_color = excluded.accent_color, updated_at = now()`,
      [dto.tenantId, dto.accentColor ?? null]
    );
    return result.rows[0];
  }

  async upsertAsset(dto: UpsertWhiteLabelAssetDto) {
    const result = await this.postgres.query(
      `insert into white_label_assets (tenant_id, asset_type, s3_key)
       values ($1, $2, $3)
       on conflict (tenant_id, asset_type) do update set s3_key = excluded.s3_key, updated_at = now()
       returning *`,
      [dto.tenantId, dto.assetType, dto.s3Key]
    );
    return result.rows[0];
  }

  async upsertEmailTemplate(dto: UpsertEmailTemplateDto) {
    const result = await this.postgres.query(
      `insert into white_label_email_templates (tenant_id, template_code, subject, body)
       values ($1, upper($2), $3, $4)
       on conflict (tenant_id, template_code) do update set subject = excluded.subject, body = excluded.body, updated_at = now()
       returning *`,
      [dto.tenantId, dto.templateCode, dto.subject, dto.body]
    );
    return result.rows[0];
  }
}
