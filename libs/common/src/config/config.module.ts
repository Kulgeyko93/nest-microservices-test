import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { EnvService } from './env.service';
import { getValidatedConfig } from '../app-configs/env.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: getValidatedConfig,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class ConfigModule {}
