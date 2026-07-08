import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthenticatedRequest } from "./authenticated-request.js";
import { REQUIRED_PERMISSIONS_KEY } from "./permissions.decorator.js";
import { REQUIRED_ROLES_KEY } from "./roles.decorator.js";

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(REQUIRED_PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(REQUIRED_ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions?.length && !requiredRoles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!request.user) {
      throw new UnauthorizedException("Authentication is required.");
    }

    const hasRole = !requiredRoles?.length || requiredRoles.some((role) => request.user?.roles.includes(role));
    const hasPermission =
      !requiredPermissions?.length || requiredPermissions.every((permission) => request.user?.permissions.includes(permission));

    if (!hasRole || !hasPermission) {
      throw new ForbiddenException("Insufficient permissions.");
    }

    return true;
  }
}
