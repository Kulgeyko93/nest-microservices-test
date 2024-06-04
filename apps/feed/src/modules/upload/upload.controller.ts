import { FileTypes, MinioBuckets, UploadSinglePostFile } from '@lib/common';
import {
  Body,
  Controller,
  HttpException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() { userId }: Record<'userId', string>,
  ) {
    try {
      const uploadedFile = await this.uploadService.storeFile({
        file,
        userId,
        baseBucket: MinioBuckets.Avatar,
        fileType: FileTypes.Avatar,
      });

      return { uploadedFile };
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }

  @Post('post')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() { userId }: Record<'userId', string>,
  ): Promise<UploadSinglePostFile.Response> {
    try {
      const uploadedFile = await this.uploadService.storeFile({
        file,
        userId,
        baseBucket: MinioBuckets.Post,
        fileType: FileTypes.Post,
      });
      return { file: uploadedFile };
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }
}
