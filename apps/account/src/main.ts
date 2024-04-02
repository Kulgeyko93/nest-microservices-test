import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  const configService = app.get(ConfigService);

  const port = configService.get('HTTP_PORT') || 3030;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TCP_PORT'),
    },
  });

  app.useGlobalPipes(new ZodValidationPipe());

  await app.startAllMicroservices();
  await app.listen(port, () =>
    console.log(`Account service starts on port ${port}`),
  );
}
bootstrap();
