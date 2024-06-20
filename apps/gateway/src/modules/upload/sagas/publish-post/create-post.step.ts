import {
  AccountValidateUser,
  CreatePostUser,
  FileEntity,
  KafkaMicroserviceNames,
  SagaStep,
} from '@lib/common';
import {
  HttpException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export interface ICreatePostStep {
  userId: string;
  content: string;
  file?: FileEntity;
}

@Injectable()
export class CreatePostStep extends SagaStep<any, any> implements OnModuleInit {
  constructor(
    @Inject(KafkaMicroserviceNames.AccountMS)
    private accountClient: ClientKafka,
  ) {
    super();
  }

  async invoke(data: ICreatePostStep): Promise<FileEntity> {
    try {
      const post = await lastValueFrom(
        this.accountClient.send<FileEntity>(CreatePostUser.topic, data),
      );

      return post;
    } catch (error) {
      throw new HttpException(error?.message, error?.code);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async withCompensation(file: FileEntity): Promise<boolean> {
    const post = await lastValueFrom(
      this.accountClient.send<FileEntity>(CreatePostUser.topic, file),
    );
  }

  async onModuleInit() {
    //  TODO: investigate to creation all topics in one place
    this.accountClient.subscribeToResponseOf(CreatePostUser.topic);
    this.accountClient.subscribeToResponseOf(AccountValidateUser.topic);
    await this.accountClient.connect();
  }

  async onModuleDestroy() {
    await this.accountClient.close();
  }
}
