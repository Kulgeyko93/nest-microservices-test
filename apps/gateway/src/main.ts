import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);

  const port = configService.getOrThrow('PORT');

  await app.listen(port, () =>
    console.log(`Gateway service is run on port = ${port}`),
  );
}
bootstrap();
