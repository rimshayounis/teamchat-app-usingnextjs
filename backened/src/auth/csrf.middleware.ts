






import * as csrf from 'csurf';
import { Request, Response, NextFunction } from 'express';

export class CsrfMiddleware {
  private csrfProtection;

  constructor() {
    this.csrfProtection = csrf({
      cookie: {
        httpOnly: true,
        sameSite: 'strict',
        secure: false, // ✅ Set to true if you're using HTTPS in production
      },
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.csrfProtection(req, res, (err) => {
      if (err) {
        return next(err); // ✅ Properly forward CSRF errors
      }

      try {
        // ✅ Always generate and expose token for use in /auth/csrf-token
        res.locals.csrfToken = req.csrfToken();
      } catch (e) {
        console.error('Failed to generate CSRF token:', e.message);
      }

      next();
    });
  }
}
