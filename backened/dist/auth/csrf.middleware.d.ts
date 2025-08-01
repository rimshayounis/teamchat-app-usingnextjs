import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class CsrfMiddleware implements NestMiddleware {
    private readonly csrfProtection;
    constructor();
    use(req: Request, res: Response, next: NextFunction): void;
}
