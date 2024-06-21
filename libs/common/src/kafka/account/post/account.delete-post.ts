import { PostEntity } from '../../..';

export namespace DeletePostUser {
  export const topic = 'account.delete-post.command';

  export class Request {
    id: string;
  }

  export class Response extends PostEntity {}
}
