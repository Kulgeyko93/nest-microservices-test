import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { HttpModule } from '@nestjs/axios';
import { UploadPostFiles } from './sagas/publish-post/upload-files.step';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 0,
    }),
  ],
  controllers: [UploadController],
  providers: [UploadPostFiles],
})
export class UploadModule {}
