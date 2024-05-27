import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { FileEntity } from './entities/file.entity';
import { DatabaseModule } from '@lib/common';
import { MinioStorageModule } from '../minio/minio.module';
import { UploadService } from './upload.service';
import { UploadRepository } from './upload.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([FileEntity]),
    MinioStorageModule,
  ],
  controllers: [UploadController],
  providers: [UploadService, UploadRepository],
})
export class UploadModule {}
