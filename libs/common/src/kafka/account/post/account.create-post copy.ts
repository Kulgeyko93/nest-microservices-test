import { FileEntity, PostEntity } from '../../..';

export namespace CreatePostUser {
  export const topic = 'account.create-post.command';

  export class Request {
    userId: string;
    content: string;
    files?: FileEntity[];
  }

  export class Response extends PostEntity {}
}
