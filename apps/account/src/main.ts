import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KafkaClients, KafkaConsumerGroups } from '@lib/common';

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
        clientId: KafkaClients.AccountClient,
        brokers: [broker],
      },
      consumer: {
        groupId: KafkaConsumerGroups.AccountConsumer,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(port, () =>
    console.log(`Account service starts on port ${port}`),
  );
}
bootstrap();
