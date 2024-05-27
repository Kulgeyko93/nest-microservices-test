import {
  Controller,
  HttpException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadService } from './upload.service';
import { CurrentUser, IUserEntityContract } from '@lib/common';

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
      const avatarPayload = {
        fieldname: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        buffer: file.buffer,
      };

      const result = await this.uploadService.uploadAvatar(
        user.id,
        avatarPayload,
      );
      return result;
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }
}
