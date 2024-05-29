import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  const configService = app.get(ConfigService);

  const port = +configService.get('HTTP_PORT') || 3030;
  const broker = configService.getOrThrow('KAFKA_BROKER');

  app.useGlobalPipes(new ZodValidationPipe());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'account-client',
        brokers: [broker],
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(port, () =>
    console.log(`Account service starts on port ${port}`),
  );
}
bootstrap();
