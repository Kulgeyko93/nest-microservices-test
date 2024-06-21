import {
  FeedDeleteFile,
  FeedSaveUploadedFile,
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
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UploadRepository } from './upload.repository';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly uploadRepository: UploadRepository,
  ) {}
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
      return uploadedFile;
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }

  @Delete('post/store/:filename')
  async deleteFile(
    @Param('filename') filename: string,
  ): Promise<FeedDeleteFile.Response> {
    try {
      await this.uploadService.deleteFileInStore(filename, MinioBuckets.Post);

      return {
        result: 'success',
      };
    } catch (error) {
      throw new HttpException(error?.message, error?.code);
    }
  }

  @MessagePattern(FeedSaveUploadedFile.topic)
  async deletePost(@Payload() data: FeedSaveUploadedFile.Request) {
    try {
      const file = await this.uploadRepository.create(data);

      return JSON.stringify(file);
    } catch (error) {
      console.error(error?.message);
      return null;
    }
  }
}
