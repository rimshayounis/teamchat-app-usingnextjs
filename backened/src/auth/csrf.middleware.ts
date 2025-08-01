




import * as csurf from 'csurf';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  private readonly csrfProtection;

  constructor() {
    this.csrfProtection = csurf({
      cookie: true, 
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.csrfProtection(req, res, (err: any) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or missing CSRF token' });
      }

      res.locals.csrfToken = req.csrfToken();
      next();
    });
  }
}

