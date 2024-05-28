import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(NotificationModule);
    const configService = app.get(ConfigService);

    const brokerHost = configService.getOrThrow('NOTIFICATION_BROKER');

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'myapp',
          brokers: ['192.168.100.4:9092'],
          // brokers: [brokerHost],
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
