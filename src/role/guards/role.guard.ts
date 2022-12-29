import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role: string = this.reflector.get<string>(
      'role',
      context.getHandler(),
    );
    if (!role) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const hasRole = () => {
      if (user.role === role) {
        return true;
      } else {
        return false;
      }
    };
    return user && user.role && hasRole();
  }
}
