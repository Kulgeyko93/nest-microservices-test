import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { ZodValidationPipe } from 'nestjs-zod';

const configService = new ConfigService();

async function bootstrap() {
  const port = configService.get('HTTP_PORT') || 8081;
  const app = await NestFactory.create(AuthModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TSP_PORT'),
    },
  });

  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  app.useGlobalPipes(new ZodValidationPipe());

  await app.startAllMicroservices();
  await app.listen(port, () => console.log(`Auth service starts on port ${port}`));
}
bootstrap();
