import { Request, Response, NextFunction } from 'express';
export declare class CsrfMiddleware {
    private csrfProtection;
    constructor();
    use(req: Request, res: Response, next: NextFunction): void;
}
