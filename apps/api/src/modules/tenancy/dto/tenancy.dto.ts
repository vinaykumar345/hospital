import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsHexColor, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, Matches, MaxLength } from "class-validator";

export class CreateTenantDto {
  @ApiProperty({ example: "City Care Hospital" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  name!: string;

  @ApiProperty({ example: "city-care" })
  @Matches(/^[a-z0-9][a-z0-9-]{2,62}$/)
  slug!: string;

  @ApiProperty({ example: "admin@citycare.example" })
  @IsEmail()
  primaryContactEmail!: string;

  @ApiProperty({ required: false, example: "citycare.example.com" })
  @IsOptional()
  @Matches(/^[a-z0-9.-]+\.[a-z]{2,}$/i)
  domain?: string;
}

export class UpdateTenantBrandingDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl({ require_protocol: true })
  logoUrl?: string;

  @ApiProperty({ required: false, example: "#1D6F66" })
  @IsOptional()
  @IsHexColor()
  primaryColor?: string;

  @ApiProperty({ required: false, example: "#F5F7FB" })
  @IsOptional()
  @IsHexColor()
  secondaryColor?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  mobileAppName?: string;
}

export class TenantIdParamDto {
  @ApiProperty()
  @IsUUID()
  tenantId!: string;
}
