import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { getMinioConfig } from '../../core/configs/minio.config';
import { MinioClientService } from './minio-client.service';

@Module({
  imports: [MinioModule.registerAsync(getMinioConfig())],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioStorageModule {}
