import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as requestIp from 'request-ip';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET, POST',
      allowedHeaders: ['Content-Type'],
      preflightContinue: false,
    },
  });

  app.use(requestIp.mw());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3010, () => Logger.log('Server is started on port - 3010'));
}

bootstrap();
