import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { EnvService } from './env.service';
import { commonLibEnvConfig } from '../app-configs/env.config';

@Module({
  imports: [NestConfigModule.forRoot(commonLibEnvConfig())],
  providers: [EnvService],
  exports: [EnvService],
})
export class ConfigModule {}
