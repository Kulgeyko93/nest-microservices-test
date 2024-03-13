import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { Logger } from 'nestjs-pino';
import { ZodValidationPipe } from 'nestjs-zod';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

const configService = new ConfigService();

async function bootstrap() {
  const port = configService.get('PORT') || 7080;
  const app = await NestFactory.create(ReservationsModule);
  configService.get('PAYMENTS_HOST');
  configService.get('PAYMENTS_PORT');
  configService.get('PAYMENTS_HOST');
  configService.get('PAYMENTS_PORT');

  app.useGlobalPipes(new ZodValidationPipe());
  app.useLogger(app.get(Logger));
  app.use(cookieParser());

  await app.listen(port, () => console.log(`Reservations service starts on port ${port}`));
}
bootstrap();
