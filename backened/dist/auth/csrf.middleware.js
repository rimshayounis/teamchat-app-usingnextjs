"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrfMiddleware = void 0;
const csurf = require("csurf");
const common_1 = require("@nestjs/common");
let CsrfMiddleware = class CsrfMiddleware {
    csrfProtection;
    constructor() {
        this.csrfProtection = csurf({
            cookie: true,
        });
    }
    use(req, res, next) {
        this.csrfProtection(req, res, (err) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or missing CSRF token' });
            }
            res.locals.csrfToken = req.csrfToken();
            next();
        });
    }
};
exports.CsrfMiddleware = CsrfMiddleware;
exports.CsrfMiddleware = CsrfMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CsrfMiddleware);
//# sourceMappingURL=csrf.middleware.js.map