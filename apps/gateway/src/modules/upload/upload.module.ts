import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CreatePostStep } from './sagas/publish-post/create-post.step';
import { UploadPostFiles } from './sagas/publish-post/upload-files.step';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
      maxRedirects: 0,
    }),
  ],
  controllers: [UploadController],
  providers: [UploadPostFiles, CreatePostStep],
})
export class UploadModule {}
