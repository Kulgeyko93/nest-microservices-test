import { NestFactory } from '@nestjs/core';
import { PostServiceModule } from './post.module';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(PostServiceModule);
  const configService = app.get(ConfigService);

  const port = +configService.get('HTTP_PORT') || 3050;

  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(port, () =>
    console.log(`Post service starts on port ${port}`),
  );
}
bootstrap();
