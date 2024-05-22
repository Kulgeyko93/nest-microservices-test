import { Module } from '@nestjs/common';
import { UploadResolver } from './upload.resolver';
import { FileModel } from './models/file.model';
import { DatabaseModule } from '@lib/common';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([FileModel])],
  providers: [UploadResolver],
})
export class UploadModule {}
