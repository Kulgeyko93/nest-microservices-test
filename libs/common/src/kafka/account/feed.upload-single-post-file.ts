import { FileEntity } from '../../database';

export namespace UploadSinglePostFile {
  export const topic = 'feed.upload-single-file.command';

  export class Request {
    file: Express.Multer.File;
    userId: string;
  }

  export class Response {
    file: FileEntity;
  }
}
