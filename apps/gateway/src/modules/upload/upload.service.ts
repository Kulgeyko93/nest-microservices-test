import {
  CreatePostUser,
  FeedDeleteFile,
  FileEntity,
  KafkaMicroserviceNames,
  SagaOrchestrator,
} from '@lib/common';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UploadSinglePostFile } from '@lib/common';
import FormData from 'form-data';
import { lastValueFrom } from 'rxjs';

export interface PostInitData {
  userId: string;
  content: string;
  file: Express.Multer.File;
}

export interface PostPayload {
  uploadedFiles?: FileEntity;
}

@Injectable()
export class UploadService {
  private readonly logger: Logger;

  constructor(
    private readonly httpService: HttpService,

    @Inject(KafkaMicroserviceNames.AccountMS)
    private accountClient: ClientKafka,
  ) {
    this.logger = new Logger(UploadService.name);
  }

  async createPostSaga(payload: PostInitData) {
    const createPostSaga = new SagaOrchestrator<PostInitData & PostPayload>(
      'CREATE_POST',
      payload,
    );

    await createPostSaga
      .step(async () => {
        const file = createPostSaga.getParam('file');
        const userId = createPostSaga.getParam('userId');

        const { formData, headers } = this.createFormData({ file, userId });

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

        createPostSaga.setParam('uploadedFiles', result.data.file);
      })
      .withCompensate(async () => {
        const uploadedFile: FileEntity =
          createPostSaga.getParam('uploadedFiles');
        await lastValueFrom(
          this.httpService.delete<FeedDeleteFile.Response>(
            // TODO set in config
            `http://localhost:3040/upload/${uploadedFile.id}`,
          ),
        );
      })
      .step(async () => {
        const data: CreatePostUser.Request = {
          userId: createPostSaga.getParam('userId'),
          content: createPostSaga.getParam('content'),
          files: [createPostSaga.getParam('uploadedFiles')],
        };
        await lastValueFrom(
          this.accountClient.send<CreatePostUser.Response>(
            CreatePostUser.topic,
            data,
          ),
        );
      })
      .start();

    return {
      status: 'uploaded',
    };
  }

  createFormData({ file, userId }: Pick<PostInitData, 'file' | 'userId'>) {
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

    return {
      formData,
      headers,
    };
  }
}
