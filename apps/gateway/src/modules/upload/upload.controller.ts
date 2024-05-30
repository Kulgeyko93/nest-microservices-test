import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  // CurrentUser,
  // IUserEntityContract,
  KafkaMicroserviceNames,
} from '@lib/common';
import { ClientKafka } from '@nestjs/microservices';
import { PublishPostSaga, PublishPostStatus } from './sagas/publish-post.saga';

@Controller('upload')
export class UploadController {
  constructor(
    @Inject(KafkaMicroserviceNames.AccountMS)
    private readonly accountClient: ClientKafka,

    private readonly httpService: HttpService,
  ) {}

  @Post('publish-post')
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(
    @UploadedFile() files: Express.Multer.File,
    @Body() dto: any,
    // @CurrentUser() user: IUserEntityContract,
  ) {
    try {
      // FeedUploadFiles

      const publishPostSaga = new PublishPostSaga(
        files,
        this.accountClient,
        this.httpService,
      );

      await publishPostSaga.setState(PublishPostStatus.PublishPost);

      console.log('object');
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }
}
