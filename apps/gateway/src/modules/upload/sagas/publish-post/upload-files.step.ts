import { lastValueFrom } from 'rxjs';
import {
  SagaStep,
  UploadPostFilesStep,
  UploadSinglePostFile,
} from '@lib/common';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import FormData from 'form-data';

@Injectable()
export class UploadPostFiles extends SagaStep<UploadPostFilesStep, any> {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  async invoke({
    file,
    userId,
  }: UploadPostFilesStep): Promise<UploadSinglePostFile.Response> {
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      filepath: file.path,
    });
    formData.append('userId', userId);

    const headers = {
      ...formData.getHeaders(),
      'Content-Length': formData.getLengthSync(),
    };

    const result = await lastValueFrom(
      this.httpService.post<UploadSinglePostFile.Response>(
        'http://localhost:3040/upload/post',
        formData,
        {
          headers,
        },
      ),
    );

    return result.data;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  withCompensation({ file, userId }: UploadPostFilesStep): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  private sendToFeedService() {}
}
