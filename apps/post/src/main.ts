import { NestFactory } from '@nestjs/core';
import { PostModule } from './post.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(PostModule);
  const configService = app.get(ConfigService);

  const port = +configService.get('HTTP_PORT') || 3050;

  await app.listen(port, () =>
    console.log(`Post service starts on port ${port}`),
  );
}
bootstrap();
