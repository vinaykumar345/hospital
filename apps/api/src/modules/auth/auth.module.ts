import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { AUTH_REPOSITORY } from "./auth.constants.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { PasswordService } from "./password.service.js";
import { PostgresAuthRepository } from "./postgres-auth.repository.js";
import { TokenService } from "./token.service.js";

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    TokenService,
    PostgresAuthRepository,
    {
      provide: AUTH_REPOSITORY,
      useExisting: PostgresAuthRepository
    }
  ],
  exports: [AuthService]
})
export class AuthModule {}
