import {
  FeedDeleteFile,
  MinioBuckets,
  UploadSinglePostFile,
} from '@lib/common';
import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
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
  @Post('post')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() { userId }: any,
  ): Promise<UploadSinglePostFile.Response> {
    try {
      const uploadedFile = await this.uploadService.storeFile({
        file,
        userId,
        baseBucket: MinioBuckets.Post,
      });
      return { file: uploadedFile };
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string): Promise<FeedDeleteFile.Response> {
    try {
      await this.uploadService.deleteFile(id, MinioBuckets.Post);

      return {
        result: 'success',
      };
    } catch (error) {
      throw new HttpException(error?.message, error?.code);
    }
  }
}
