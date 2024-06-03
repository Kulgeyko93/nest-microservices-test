import { UserEntity } from '../../database';

export namespace CreatePostUser {
  export const topic = 'account.create-post.command';

  export class Request {
    userId: string;
    content: string;
  }

  export class Response {
    user: UserEntity;
  }
}
