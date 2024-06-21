import { FileEntity } from '../../database';

export namespace FeedSaveUploadedFile {
  export const topic = 'feed.save-uploaded-file.command';

  export class Request {
    filename: string;
    url: string;
    userId: string;
    postId?: string;
  }

  export class Response extends FileEntity {}
}
