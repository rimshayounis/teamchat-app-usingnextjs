
import * as csrf from 'csurf';
import { Request, Response, NextFunction } from 'express';

export class CsrfMiddleware {
  private csrfProtection;

  constructor() {
    this.csrfProtection = csrf({
      cookie: {
        httpOnly: true,
        sameSite: 'strict',
        secure: false, 
      },
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.csrfProtection(req, res, (err) => {
      if (err) {
        return next(err); 
      }

      try {
        res.locals.csrfToken = req.csrfToken();
      } catch (e) {
        console.error('Failed to generate CSRF token:', e.message);
      }

      next();
    });
  }
}
