import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TCP_PORT'),
    },
  });

  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ZodValidationPipe());

  await app.startAllMicroservices();
  console.log(`Notification service was started`);
}
bootstrap();
