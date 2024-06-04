import { CreatePostUser, KafkaMicroserviceNames, SagaStep } from '@lib/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export interface ICreatePostStep {
  userId: string;
  content: string;
}

@Injectable()
export class CreatePostStep
  extends SagaStep<ICreatePostStep, any>
  implements OnModuleInit
{
  constructor(
    @Inject(KafkaMicroserviceNames.AccountMS)
    private accountClient: ClientKafka,
  ) {
    super();
  }

  async invoke(data: ICreatePostStep): Promise<any> {
    try {
      const post = await lastValueFrom(
        this.accountClient.send(CreatePostUser.topic, data),
      );
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  }

  withCompensation(params: ICreatePostStep): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  async onModuleInit() {
    this.accountClient.subscribeToResponseOf(CreatePostUser.topic);
    await this.accountClient.connect();
  }
}
