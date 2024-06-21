import { CurrentUser, UserEntity } from '@lib/common';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('publish-post')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() { content }: Record<'content', string>,
    @CurrentUser() { id: userId }: UserEntity,
  ) {
    try {
      this.uploadService.createPostSaga({
        userId,
        content,
        file,
      });
      return 'uploading...';
    } catch (error) {}
  }
}
