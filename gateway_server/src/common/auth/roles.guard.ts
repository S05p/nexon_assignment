import {
    CanActivate,
    ExecutionContext,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../common-variables';
  import { Role } from './auth.dto';
  import { ApiResult } from '../api_result';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles.length) return true;
  
      const user = context.switchToHttp().getRequest().user;
      if (!user || !requiredRoles.includes(user.role)) {
        throw ApiResult.INVALID_ROLE;
      }
      return true;
    }
  }