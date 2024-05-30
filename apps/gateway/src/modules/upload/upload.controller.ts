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

@Controller('upload')
export class UploadController {
  private steps: SagaStep<any, any>[] = [];
  private successfulSteps: SagaStep<any, any>[] = [];

  constructor(
    @Inject(KafkaMicroserviceNames.AccountMS)
    private readonly accountClient: ClientKafka,

    private readonly step1: UploadPostFiles,

    private readonly httpService: HttpService,
  ) {
    this.steps = [step1];
  }

  @Post('publish-post')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: any,
    // @CurrentUser() user: IUserEntityContract,
  ) {
    try {
      for (const step of this.steps) {
        try {
          console.info(`Invoking: ${step.name} ...`);
          await step.invoke(file);
          this.successfulSteps.unshift(step);
        } catch (error) {
          console.error(`Failed Step: ${step.name} !!`);
          this.successfulSteps.forEach(async (s) => {
            console.info(`Rollbacking: ${s.name} ...`);
            await s.withCompensation(file);
          });
          throw error;
        }
      }
      console.info('Order Creation Transaction ended successfuly');

      console.log('object');
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }
}
