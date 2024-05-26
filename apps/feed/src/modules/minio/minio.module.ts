import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { getMinioConfig } from '../../core/configs/minio.config';

@Module({
  imports: [MinioModule.registerAsync(getMinioConfig())],
})
export class MinioStorageModule {}
