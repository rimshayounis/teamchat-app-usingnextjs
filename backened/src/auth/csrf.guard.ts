





import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const csrfTokenFromHeader = request.headers['x-csrf-token'];
    if (!csrfTokenFromHeader) {
      throw new ForbiddenException('Missing CSRF token');
    }

    return true;
  }
}

