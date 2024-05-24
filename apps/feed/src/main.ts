import { NestFactory } from '@nestjs/core';
import { FeedModule } from './feed.module';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { TcpAuthMiddleware } from '@lib/common';

async function bootstrap() {
  const app = await NestFactory.create(FeedModule);
  const configService = app.get(ConfigService);

  const port = +configService.get('HTTP_PORT') || 3040;
  app.useGlobalPipes(new ZodValidationPipe());
  // app.use(TcpAuthMiddleware);

  await app.listen(port, () => console.log(`Server was run on port: ${port}`));
}

bootstrap();
