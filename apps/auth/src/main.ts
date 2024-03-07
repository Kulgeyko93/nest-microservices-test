import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const port = 8081;
  const app = await NestFactory.create(AuthModule);
  await app.listen(port, () =>
    console.log(`Auth service starts on port ${port}`),
  );
}
bootstrap();
