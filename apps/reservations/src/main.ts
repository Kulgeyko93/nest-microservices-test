import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { Logger } from 'nestjs-pino';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const port = 8080;
  const app = await NestFactory.create(ReservationsModule);

  app.useGlobalPipes(new ZodValidationPipe());
  app.useLogger(app.get(Logger));

  await app.listen(port, () =>
    console.log(`Reservations service starts on port ${port}`),
  );
}
bootstrap();
