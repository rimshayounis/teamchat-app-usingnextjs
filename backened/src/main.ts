


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { CsrfMiddleware } from './auth/csrf.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // ✅ Fix: Bind `this` correctly
  const csrf = new CsrfMiddleware();
  app.use(csrf.use.bind(csrf));

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });



  await app.listen(3000);
  console.log("API is running");
}
bootstrap();

