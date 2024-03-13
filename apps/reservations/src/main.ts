import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { Logger } from 'nestjs-pino';
import { ZodValidationPipe } from 'nestjs-zod';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const configService = app.get(ConfigService);

  const port = configService.get('PORT') || 7080;

  app.useGlobalPipes(new ZodValidationPipe());
  app.useLogger(app.get(Logger));
  app.use(cookieParser());

  await app.listen(port, () => console.log(`Reservations service starts on port ${port}`));
}
bootstrap();
