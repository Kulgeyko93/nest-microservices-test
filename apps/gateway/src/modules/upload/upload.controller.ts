import { CurrentUser, UploadSinglePostFile, UserEntity } from '@lib/common';
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
import { UploadPostFile } from './sagas/publish-post/upload-files.step';
import { UploadFileStep } from './types/types';

@Controller('upload')
export class UploadController {
  private steps: [UploadFileStep];
  private successfulSteps: [UploadFileStep];

  constructor(
    private readonly uploadPostFileStep: UploadPostFile,
    private readonly createPostStep: CreatePostStep,
  ) {
    this.steps = [this.uploadPostFileStep];
  }

  @Post('publish-post')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() { content }: Record<'content', string>,
    @CurrentUser() { id: userId }: UserEntity,
  ) {
    try {
      let stepData: UploadSinglePostFile.Request | any = {
        file,
        userId,
      };

      for (let i = 0; i < this.steps.length; i += 1) {
        if (!stepData) break;

        const step = this.steps[i];

        const result = await step.invoke(stepData);

        stepData =
          this.steps[i] instanceof CreatePostStep
            ? {
                userId,
                content,
                file: result.file,
              }
            : null;
      }

      // const uploadedFiles = await this.uploadPostFileStep.invoke({
      //   file,
      //   userId,
      // });

      // this.successfulSteps.push(this.uploadPostFileStep);

      // const createdPost = await this.createPostStep.invoke({
      //   userId,
      //   content,
      //   file: uploadedFiles.file,
      // });

      // return createdPost;
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }
}
