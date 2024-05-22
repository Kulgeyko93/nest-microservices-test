import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  const configService = app.get(ConfigService);

  const port = +configService.get('HTTP_PORT') || 3030;

  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(port, () =>
    console.log(`Account service starts on port ${port}`),
  );
}
bootstrap();
