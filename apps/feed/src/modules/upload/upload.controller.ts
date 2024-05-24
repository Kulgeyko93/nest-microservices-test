import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('upload')
export class UploadController {
  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
