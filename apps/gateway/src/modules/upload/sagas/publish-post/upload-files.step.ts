import {
  FeedDeleteFile,
  UploadPostFilesStep,
  UploadSinglePostFile,
} from '@lib/common';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import FormData from 'form-data';
import { lastValueFrom } from 'rxjs';
import { UploadFileStepSaga } from '../../types/types';

@Injectable()
export class UploadPostFile extends UploadFileStepSaga {
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
        // TODO set in config
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
  async withCompensation(id: string): Promise<any> {
    const result = await lastValueFrom(
      this.httpService.delete<FeedDeleteFile.Response>(
        // TODO set in config
        `http://localhost:3040/upload/${id}`,
      ),
    );
    return result.data;
  }

  private sendToFeedService() {}
}
