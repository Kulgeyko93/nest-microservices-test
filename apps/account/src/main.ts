import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  const configService = app.get(ConfigService);

  const port = configService.get<string>('PORT') || 3030;

  await app.listen(port, () =>
    console.log(`Account service is run on port = ${port}`),
  );
}
bootstrap();
