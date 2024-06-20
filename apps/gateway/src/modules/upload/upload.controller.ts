import {
  CurrentUser,
  FeedDeleteFile,
  SagaStep,
  UploadSinglePostFile,
  UserEntity,
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
import { CreatePostStep } from './sagas/publish-post/create-post.step';
import { UploadPostFiles } from './sagas/publish-post/upload-files.step';

@Controller('upload')
export class UploadController {
  private steps: [
    SagaStep<
      UploadSinglePostFile.Response,
      UploadSinglePostFile.Response,
      string,
      FeedDeleteFile.Response
    >,
  ] = [];
  private successfulSteps: SagaStep<any, any, any, any>[] = [];

  constructor(
    private readonly uploadPostFileStep: UploadPostFiles,
    private readonly createPostStep: CreatePostStep,
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
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }
}
