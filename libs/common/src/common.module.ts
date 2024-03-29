import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { commonEnvConfig } from './core/configs/env.config';
import { ContractsModule } from './contracts/contracts.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [DatabaseModule, ConfigModule.forRoot(commonEnvConfig()), ContractsModule],
})
export class CommonModule {}
