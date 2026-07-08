import { SetMetadata } from "@nestjs/common";
import { RoleName } from "@hospital/shared";

export const REQUIRED_ROLES_KEY = "required_roles";

export const RequireRoles = (...roles: RoleName[]) => SetMetadata(REQUIRED_ROLES_KEY, roles);
