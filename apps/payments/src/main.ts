import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TSP_PORT'),
    },
  });

  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  console.log(`Payment service was started`);
}
bootstrap();