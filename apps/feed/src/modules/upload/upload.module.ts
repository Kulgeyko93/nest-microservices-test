import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { FileEntity } from './entities/file.entity';
import { DatabaseModule } from '@lib/common';
import { MinioStorageModule } from '../minio/minio.module';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([FileEntity]),
    MinioStorageModule,
  ],
  controllers: [UploadController],
})
export class UploadModule {}
