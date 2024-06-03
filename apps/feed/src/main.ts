import { NestFactory } from '@nestjs/core';
import { FeedModule } from './feed.module';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KafkaClients, KafkaConsumerGroups } from '../../../libs/common/src';

async function bootstrap() {
  const app = await NestFactory.create(FeedModule);
  const configService = app.get(ConfigService);

  const port = +configService.get('HTTP_PORT') || 3040;
  const broker = configService.getOrThrow('KAFKA_BROKER');
  app.useGlobalPipes(new ZodValidationPipe());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: KafkaClients.FeedClient,
        brokers: [broker],
      },
      consumer: {
        groupId: KafkaConsumerGroups.FeedConsumer,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(port, () => console.log(`Server was run on port: ${port}`));
}

bootstrap();
