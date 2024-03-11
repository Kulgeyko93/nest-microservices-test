import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { Logger } from 'nestjs-pino';
import { ZodValidationPipe } from 'nestjs-zod';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

async function bootstrap() {
  const port = configService.get('PORT') || 7080;
  const app = await NestFactory.create(ReservationsModule);

  app.useGlobalPipes(new ZodValidationPipe());
  app.useLogger(app.get(Logger));

  await app.listen(port, () => console.log(`Reservations service starts on port ${port}`));
}
bootstrap();
