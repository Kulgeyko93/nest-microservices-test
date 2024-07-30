import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
      maxRedirects: 0,
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
