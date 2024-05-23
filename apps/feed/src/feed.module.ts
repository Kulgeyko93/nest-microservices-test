import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { feedEnvConfig } from './core/configs/env.config';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [ConfigModule.forRoot(feedEnvConfig()), UploadModule],
})
export class FeedModule {}
