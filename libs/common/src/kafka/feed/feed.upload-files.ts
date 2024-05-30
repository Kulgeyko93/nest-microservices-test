export namespace FeedUploadFiles {
  export const topic = 'feed.upload-files.command';

  export class Request {
    files: Express.Multer.File;
  }

  export class Response {
    filesLinks: string[];
  }
}
