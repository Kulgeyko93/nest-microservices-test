import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import { commonEnvConfig } from './configs/env.config';

@Module({
  imports: [ConfigModule.forRoot(commonEnvConfig())],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
