import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  const configService = app.get(ConfigService);

  const port = +configService.get('HTTP_PORT') || 3030;
  const tcpPort = +configService.get('TCP_PORT');
  const tcpHost = configService.get('TCP_HOST');

  app.useGlobalPipes(new ZodValidationPipe());

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: tcpHost,
      port: tcpPort,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port, () =>
    console.log(`Account service starts on port ${port}`),
  );
}
bootstrap();
