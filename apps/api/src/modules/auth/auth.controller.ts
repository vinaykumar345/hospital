import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service.js";
import {
  ForgotPasswordDto,
  LoginWithPasswordDto,
  LogoutDto,
  RefreshTokenDto,
  RegisterWithPasswordDto,
  RequestMobileOtpDto,
  ResetPasswordDto,
  VerifyMobileOtpDto
} from "./dto/auth.dto.js";

@ApiTags("authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterWithPasswordDto) {
    return this.auth.registerWithPassword(dto);
  }

  @Post("login")
  @HttpCode(200)
  login(@Body() dto: LoginWithPasswordDto) {
    return this.auth.loginWithPassword(dto);
  }

  @Post("refresh")
  @HttpCode(200)
  refresh(@Body() dto: RefreshTokenDto) {
    return this.auth.refresh(dto.refreshToken);
  }

  @Post("logout")
  @HttpCode(200)
  logout(@Body() dto: LogoutDto) {
    return this.auth.logout(dto.refreshToken);
  }

  @Post("mobile/request-otp")
  requestMobileOtp(@Body() dto: RequestMobileOtpDto) {
    return this.auth.requestMobileOtp(dto.mobile, dto.tenantId ?? null);
  }

  @Post("mobile/verify-otp")
  @HttpCode(200)
  verifyMobileOtp(@Body() dto: VerifyMobileOtpDto) {
    return this.auth.verifyMobileOtp(dto.mobile, dto.tenantId ?? null, dto.code);
  }

  @Post("password/forgot")
  @HttpCode(202)
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.auth.forgotPassword(dto.email, dto.tenantId ?? null);
  }

  @Post("password/reset")
  @HttpCode(200)
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.auth.resetPassword(dto.resetToken, dto.newPassword);
  }
}
