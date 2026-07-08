import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/database/database.module.js";
import { RbacModule } from "../rbac/rbac.module.js";
import { PostgresWhiteLabelRepository } from "./postgres-white-label.repository.js";
import { WHITE_LABEL_REPOSITORY } from "./white-label.constants.js";
import { WhiteLabelController } from "./white-label.controller.js";
import { WhiteLabelService } from "./white-label.service.js";

@Module({
  imports: [DatabaseModule, RbacModule],
  controllers: [WhiteLabelController],
  providers: [
    WhiteLabelService,
    PostgresWhiteLabelRepository,
    {
      provide: WHITE_LABEL_REPOSITORY,
      useExisting: PostgresWhiteLabelRepository
    }
  ]
})
export class WhiteLabelModule {}
