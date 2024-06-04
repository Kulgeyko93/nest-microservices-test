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
  CurrentUser,
  // CurrentUser,
  // IUserEntityContract,
  KafkaMicroserviceNames,
  SagaStep,
  UserEntity,
} from '@lib/common';
import { ClientKafka } from '@nestjs/microservices';
import { UploadPostFiles } from './sagas/publish-post/upload-files.step';
import { CreatePostStep } from './sagas/publish-post/create-post.step';

@Controller('upload')
export class UploadController {
  private steps: SagaStep<any, any>[] = [];
  private successfulSteps: SagaStep<any, any>[] = [];

  constructor(
    @Inject(KafkaMicroserviceNames.AccountMS)
    private readonly accountClient: ClientKafka,

    private readonly uploadPostFileStep: UploadPostFiles,
    private readonly createPostStep: CreatePostStep,

    private readonly httpService: HttpService,
  ) {}

  @Post('publish-post')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() { content }: Record<'content', string>,
    @CurrentUser() { id: userId }: UserEntity,
  ) {
    try {
      const uploadedFiles = await this.uploadPostFileStep.invoke({
        file,
        userId,
      });

      this.successfulSteps.push(this.uploadPostFileStep);

      const createdPost = await this.createPostStep.invoke({
        userId,
        content,
        file: uploadedFiles.file,
      });

      return createdPost;

      console.info('Order Creation Transaction ended successfully');

      console.log('object');
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }
}
