import { SetMetadata } from "@nestjs/common";
import { PermissionName } from "@hospital/shared";

export const REQUIRED_PERMISSIONS_KEY = "required_permissions";

export const RequirePermissions = (...permissions: PermissionName[]) => SetMetadata(REQUIRED_PERMISSIONS_KEY, permissions);
