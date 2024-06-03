import { lastValueFrom } from 'rxjs';
import { SagaStep } from '@lib/common';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import FormData from 'form-data';

@Injectable()
export class UploadPostFiles extends SagaStep<Express.Multer.File, any> {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  async invoke(file: Express.Multer.File): Promise<any> {
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
    return result;
  }
  withCompensation(params: Express.Multer.File): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  private sendToFeedService() {}
}
