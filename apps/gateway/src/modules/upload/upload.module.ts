import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 0,
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
