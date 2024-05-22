import { Module } from '@nestjs/common';
import { UploadResolver } from './upload.resolver';
import { FileEntity } from './entities/file.entity';
import { DatabaseModule } from '@lib/common';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([FileEntity])],
  providers: [UploadResolver],
})
export class UploadModule {}
