import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLE_PERMISSIONS } from '@socialmentorify/shared';

@Injectable()
export class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const role = (request.headers['x-user-role'] as string) ?? 'ADMIN';
    const id = (request.headers['x-user-id'] as string) ?? 'mock-user';
    request.user = {
      id,
      role,
      permissions: ROLE_PERMISSIONS[role] ?? []
    };
    return true;
  }
}
