import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import * as cookieParser from 'cookie-parser';

const configService = new ConfigService();

async function bootstrap() {
  const port = configService.get('PORT') || 8081;
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser());
  await app.listen(port, () => console.log(`Auth service starts on port ${port}`));
}
bootstrap();
