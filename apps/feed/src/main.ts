import { NestFactory } from '@nestjs/core';
import { FeedModule } from './feed.module';
import graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(FeedModule);
  const configService = app.get(ConfigService);

  const port = +configService.get('HTTP_PORT') || 3040;

  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }),
  );
  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(port, () => console.log(`Server was run on port: ${port}`));
}
bootstrap();
