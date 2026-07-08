import { ApiProperty } from "@nestjs/swagger";
import { IsHexColor, IsIn, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";

export class WhiteLabelTenantQueryDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;
}

export class UpdateWhiteLabelThemeDto extends WhiteLabelTenantQueryDto {
  @ApiProperty()
  @IsHexColor()
  primaryColor!: string;

  @ApiProperty()
  @IsHexColor()
  secondaryColor!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsHexColor()
  accentColor?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl({ require_protocol: true })
  logoUrl?: string;
}

export class UpsertWhiteLabelAssetDto extends WhiteLabelTenantQueryDto {
  @ApiProperty({ enum: ["LOGO", "FAVICON", "MOBILE_SPLASH", "EMAIL_HEADER"] })
  @IsIn(["LOGO", "FAVICON", "MOBILE_SPLASH", "EMAIL_HEADER"])
  assetType!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  s3Key!: string;
}

export class UpsertEmailTemplateDto extends WhiteLabelTenantQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  templateCode!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subject!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body!: string;
}
