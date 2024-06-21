import {
  AccountValidateUser,
  CreatePostUser,
  DeletePostUser,
  FeedSaveUploadedFile,
  KafkaMicroserviceNames,
  PostEntity,
  SagaOrchestrator,
} from '@lib/common';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UploadSinglePostFile } from '@lib/common';
import FormData from 'form-data';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

export interface PostInitData {
  userId: string;
  content: string;
  file: Express.Multer.File;
}

export interface PostPayload {
  post?: PostEntity;
  url?: string;
  filename?: string;
}

@Injectable()
export class UploadService implements OnModuleInit {
  private readonly logger: Logger;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,

    @Inject(KafkaMicroserviceNames.AccountMS)
    private accountClient: ClientKafka,

    @Inject(KafkaMicroserviceNames.FeedMS)
    private feedClient: ClientKafka,
  ) {
    this.logger = new Logger(UploadService.name);
  }

  async createPostSaga(payload: PostInitData) {
    const FEED_MS_URL = this.configService.getOrThrow('FEED_MS_URL');

    const createPostSaga = new SagaOrchestrator<PostInitData & PostPayload>(
      'CREATE_POST',
      payload,
    );

    await createPostSaga
      .step(async () => {
        const data: CreatePostUser.Request = {
          userId: createPostSaga.getParam('userId'),
          content: createPostSaga.getParam('content'),
        };
        const post = await lastValueFrom(
          this.accountClient.send<CreatePostUser.Response>(
            CreatePostUser.topic,
            data,
          ),
        );

        createPostSaga.setParam('post', post);
      })
      .withCompensate(async () => {
        const createdPost: PostEntity = createPostSaga.getParam('post');
        const post = await lastValueFrom(
          this.accountClient.send<DeletePostUser.Response>(
            DeletePostUser.topic,
            {
              id: createdPost.id,
            },
          ),
        );

        createPostSaga.setParam('post', post);
      })
      .step(async () => {
        const file = createPostSaga.getParam('file');
        const userId = createPostSaga.getParam('userId');

        const { formData, headers } = this.createFormData({ file, userId });

        const result = await lastValueFrom(
          this.httpService.post<UploadSinglePostFile.Response>(
            `${FEED_MS_URL}/upload/post`,
            formData,
            {
              headers,
            },
          ),
        );

        createPostSaga.setParam('url', result.data.url);
        createPostSaga.setParam('filename', result.data.filename);
      })
      .withCompensate(async () => {
        const filename: string = createPostSaga.getParam('filename');
        await lastValueFrom(
          this.httpService.delete(
            `${FEED_MS_URL}/upload/post/store/${filename}`,
          ),
        );
      })

      .step(async () => {
        const message: FeedSaveUploadedFile.Request = {
          filename: createPostSaga.getParam('filename'),
          url: createPostSaga.getParam('url'),
          userId: createPostSaga.getParam('userId'),
          postId: createPostSaga.getParam('post').id,
        };

        await lastValueFrom(
          this.feedClient.send<FeedSaveUploadedFile.Response>(
            FeedSaveUploadedFile.topic,
            message,
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

  async onModuleInit() {
    this.accountClient.subscribeToResponseOf(CreatePostUser.topic);
    this.accountClient.subscribeToResponseOf(AccountValidateUser.topic);
    this.accountClient.subscribeToResponseOf(DeletePostUser.topic);
    this.accountClient.subscribeToResponseOf(FeedSaveUploadedFile.topic);
    await this.accountClient.connect();
  }

  async onModuleDestroy() {
    await this.accountClient.close();
  }
}
