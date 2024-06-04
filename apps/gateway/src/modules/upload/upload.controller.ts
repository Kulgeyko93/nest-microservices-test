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
  SagaStep,
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
    @Body() dto: any,
    // @CurrentUser() user: IUserEntityContract,
  ) {
    try {
      const uploadedFiles = this.uploadPostFileStep.invoke({
        file,
        userId: '13fc94c5-c84f-402f-8580-a27b0c2c6f0f',
      });

      // const result = await this.createPostStep.invoke({
      //   userId: '13fc94c5-c84f-402f-8580-a27b0c2c6f0f',
      //   content: 'asdsadasdasdasd',
      // });

      // for (const step of this.steps) {
      //   try {
      //     console.info(`Invoking: ${step.name} ...`);
      //     const result = await step.invoke(file);
      //     this.successfulSteps.unshift(step);
      //   } catch (error) {
      //     console.error(`Failed Step: ${step.name} !!`);
      //     this.successfulSteps.forEach(async (s) => {
      //       console.info(`Rollbacking: ${s.name} ...`);
      //       await s.withCompensation(file);
      //     });
      //     throw error;
      //   }
      // }
      console.info('Order Creation Transaction ended successfuly');

      console.log('object');
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }
}
