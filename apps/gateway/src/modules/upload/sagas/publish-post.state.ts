import { PublishPostSaga } from './publish-post.saga';

export abstract class PublishPostSagaState {
  public saga: PublishPostSaga;

  public setContext(saga: PublishPostSaga) {
    this.saga = saga;
  }

  public abstract uploadFiles(): Promise<any>;
  public abstract publishPost(): Promise<any>;
  public abstract rejectPost(): Promise<any>;
}
