import {
  AccountValidateUser,
  CreatePostUser,
  FileEntity,
  KafkaMicroserviceNames,
} from '@lib/common';
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreatePostStepSaga } from '../../types/types';

@Injectable()
export class CreatePostStep extends CreatePostStepSaga implements OnModuleInit {
  constructor(
    @Inject(KafkaMicroserviceNames.AccountMS)
    private accountClient: ClientKafka,
  ) {
    super();
  }

  async invoke(data: CreatePostUser.Request): Promise<CreatePostUser.Response> {
    try {
      const post = await lastValueFrom(
        this.accountClient.send<CreatePostUser.Response>(
          CreatePostUser.topic,
          data,
        ),
      );

      if (!post)
        throw new BadRequestException('Error in process of file creation');

      return post;
    } catch (error) {
      throw new HttpException(error?.message, error?.code);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async withCompensation(file: any): Promise<any> {}

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
