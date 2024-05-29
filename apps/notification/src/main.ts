import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { KafkaClients } from '@lib/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(NotificationModule);
    const configService = app.get(ConfigService);

    const brokerHost = configService.getOrThrow('KAFKA_BROKER');

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: KafkaClients.NotificationClient,
          brokers: [brokerHost],
        },
      },
    });

    await app.startAllMicroservices();
    console.log(`Notification microservice was started on: ${brokerHost}`);
  } catch (error) {
    console.error(`Notification microservice has error`);
  }
}

bootstrap();
