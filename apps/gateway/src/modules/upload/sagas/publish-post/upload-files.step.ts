import { lastValueFrom } from 'rxjs';
import { KafkaMicroserviceNames, SagaStep } from '@lib/common';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import FormData from 'form-data';

@Injectable()
export class UploadPostFiles extends SagaStep<Express.Multer.File, any> {
  constructor(
    // @Inject(KafkaMicroserviceNames.AccountMS)
    // private accountClient: ClientKafka,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  async invoke(file: Express.Multer.File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });
    const headers = {
      ...formData.getHeaders(),
      'Content-Length': formData.getLengthSync(),
    };

    const result = await lastValueFrom(
      this.httpService.post('http://localhost:3040/upload/post', formData, {
        headers,
      }),
    );

    console.log(result);
  }
  withCompensation(params: Express.Multer.File): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  private sendToFeedService() {}
}
