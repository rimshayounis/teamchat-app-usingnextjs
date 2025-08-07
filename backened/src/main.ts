


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { CsrfMiddleware } from './auth/csrf.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  


  app.enableCors({
  origin: 'http://localhost:3001',
  credentials: true,
  exposedHeaders: ['x-csrf-token'], 
});


  app.use(cookieParser()); 
  const csrf = new CsrfMiddleware();
  app.use(csrf.use.bind(csrf));

  await app.listen(3000);
  console.log(`Server started on port 3000`);
}
bootstrap();




