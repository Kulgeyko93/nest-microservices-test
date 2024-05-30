import { ClientKafka } from '@nestjs/microservices';
import { PublishPostSagaState } from './publish-post.state';
import { HttpService } from '@nestjs/axios';
import { PublishPostSagaStateUploadFiles } from './publish-post.steps';

export enum PublishPostStatus {
  UploadFiles = 'upload-files',
  PublishPost = 'publish-post',
  RejectPublish = 'reject-publish',
}

export class PublishPostSaga {
  private state: PublishPostSagaState;
  file: Express.Multer.File;
  kafka: ClientKafka;
  httpService: HttpService;

  constructor(
    file: Express.Multer.File,
    kafka: ClientKafka,
    httpService: HttpService,
  ) {
    this.file = file;
    this.kafka = kafka;
    this.httpService = httpService;
  }

  setState(state: PublishPostStatus) {
    switch (state) {
      case PublishPostStatus.PublishPost:
        this.state = new PublishPostSagaStateUploadFiles();
        break;
      case PublishPostStatus.UploadFiles:
        break;
      case PublishPostStatus.RejectPublish:
        break;
    }

    // set context
    this.state.setContext(this);
  }
}
