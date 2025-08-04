"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrfMiddleware = void 0;
const csrf = require("csurf");
class CsrfMiddleware {
    csrfProtection;
    constructor() {
        this.csrfProtection = csrf({
            cookie: {
                httpOnly: true,
                sameSite: 'strict',
                secure: false,
            },
        });
    }
    use(req, res, next) {
        this.csrfProtection(req, res, (err) => {
            if (err) {
                return next(err);
            }
            try {
                res.locals.csrfToken = req.csrfToken();
            }
            catch (e) {
                console.error('Failed to generate CSRF token:', e.message);
            }
            next();
        });
    }
}
exports.CsrfMiddleware = CsrfMiddleware;
//# sourceMappingURL=csrf.middleware.js.map