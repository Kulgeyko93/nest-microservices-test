import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  const configService = app.get(ConfigService);

  const port = configService.get('PORT');

  await app.listen(port, () =>
    console.log(`Gateway service is run on port = ${port}`),
  );
}
bootstrap();
