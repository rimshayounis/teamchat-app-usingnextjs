






import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const csrfTokenFromHeader = request.headers['x-csrf-token'];
    const csrfTokenFromRequest = (request as any).csrfToken?.();

    return csrfTokenFromHeader === csrfTokenFromRequest;
  }
}
