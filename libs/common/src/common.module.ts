import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { commonEnvConfig } from './configs/env.config';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(commonEnvConfig())],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
