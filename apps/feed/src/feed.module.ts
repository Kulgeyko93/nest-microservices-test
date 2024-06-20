import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { feedEnvConfig } from './core/configs/env.config';
import { MinioStorageModule } from './modules/minio/minio.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(feedEnvConfig()),
    MinioStorageModule,
    UploadModule,
  ],
})
export class FeedModule {}
