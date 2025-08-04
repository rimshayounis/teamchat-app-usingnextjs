"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const csrf_middleware_1 = require("./auth/csrf.middleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3001',
        credentials: true,
        exposedHeaders: ['x-csrf-token'],
    });
    app.use(cookieParser());
    const csrf = new csrf_middleware_1.CsrfMiddleware();
    app.use(csrf.use.bind(csrf));
    await app.listen(3000);
    console.log(`Server started on port 3000`);
}
bootstrap();
//# sourceMappingURL=main.js.map