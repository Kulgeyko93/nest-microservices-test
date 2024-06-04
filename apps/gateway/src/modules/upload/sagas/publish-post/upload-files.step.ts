import { lastValueFrom } from 'rxjs';
import { SagaStep, UploadPostFilesStep } from '@lib/common';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import FormData from 'form-data';

@Injectable()
export class UploadPostFiles extends SagaStep<UploadPostFilesStep, any> {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  async invoke({ file, userId }: UploadPostFilesStep): Promise<any> {
    const formData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });
    const headers = {
      ...formData.getHeaders(),
      'Content-Length': formData.getLengthSync(),
    };

    formData.append('userId', userId);

    const result = await lastValueFrom(
      this.httpService.post('http://localhost:3040/upload/post', formData, {
        headers,
      }),
    );

    console.log(result);
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  withCompensation({ file, userId }: UploadPostFilesStep): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  private sendToFeedService() {}
}
