import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { Logger } from '@nestjs/common';

const logger = new Logger(ReservationsModule.name);

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const port = 8080;
  await app.listen(port, () =>
    logger.verbose(`Reservations service starts on port ${port}`),
  );
}
bootstrap();
