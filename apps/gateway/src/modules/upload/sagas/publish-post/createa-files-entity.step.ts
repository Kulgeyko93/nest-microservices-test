import { KafkaMicroserviceNames, SagaStep } from '@lib/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class CreateFileEntities extends SagaStep<string[], any> {
  constructor(
    @Inject(KafkaMicroserviceNames.FeedMS)
    private feedClient: ClientKafka,
  ) {
    super();
  }

  async invoke(filePaths: string[]): Promise<any> {
    // this.feedClient.send();
  }

  withCompensation(filePaths: string[]): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  onModuleInit() {
    this.feedClient.subscribeToResponseOf('hero.kill.dragon');
  }
}
