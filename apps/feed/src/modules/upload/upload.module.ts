import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { FileEntity } from './entities/file.entity';
import { DatabaseModule } from '@lib/common';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([FileEntity])],
  controllers: [UploadController],
})
export class UploadModule {}
