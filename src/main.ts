import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as requestIp from 'request-ip';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(requestIp.mw());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
