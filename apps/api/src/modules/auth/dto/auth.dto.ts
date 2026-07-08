import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length, Matches, MinLength } from "class-validator";

const e164Pattern = /^\+[1-9]\d{7,14}$/;

export class RegisterWithPasswordDto {
  @ApiProperty({ example: "doctor@examplehospital.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 12 })
  @MinLength(12)
  password!: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsUUID()
  tenantId?: string;
}

export class LoginWithPasswordDto {
  @ApiProperty({ example: "doctor@examplehospital.com" })
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsUUID()
  tenantId?: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}

export class RequestMobileOtpDto {
  @ApiProperty({ example: "+15551234567" })
  @Matches(e164Pattern)
  mobile!: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsUUID()
  tenantId?: string;
}

export class VerifyMobileOtpDto extends RequestMobileOtpDto {
  @ApiProperty({ minLength: 6, maxLength: 6 })
  @Length(6, 6)
  code!: string;
}

export class VerifyMfaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  challengeToken!: string;

  @ApiProperty({ minLength: 6, maxLength: 8 })
  @Length(6, 8)
  code!: string;
}

export class ForgotPasswordDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsUUID()
  tenantId?: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  resetToken!: string;

  @ApiProperty({ minLength: 12 })
  @MinLength(12)
  newPassword!: string;
}

export class LogoutDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}
