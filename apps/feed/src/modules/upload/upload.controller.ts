import {
  CurrentUser,
  FileTypes,
  IUserEntityContract,
  MinioBuckets,
} from '@lib/common';
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
    @CurrentUser() user: IUserEntityContract,
  ) {
    try {
      const filePayload = {
        fieldname: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        buffer: file.buffer,
      };

      const result = await this.uploadService.uploadFile({
        userId: user.id,
        file: filePayload,
        fileType: FileTypes.avatar,
        baseBucket: MinioBuckets.Avatar,
      });
      return result;
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }

  @Post('post')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: Record<'userId', string>,
  ) {
    try {
      console.log(file.filename);
      const filePayload = {
        fieldname: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        buffer: file.buffer,
      };

      const result = await this.uploadService.uploadFile({
        userId: dto.userId,
        file: filePayload,
        fileType: FileTypes.post,
        baseBucket: MinioBuckets.Post,
      });
      return file.filename;
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }
}
