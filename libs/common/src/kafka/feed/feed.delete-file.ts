export namespace FeedDeleteFile {
  export const topic = 'feed.delete-file.command';

  export class Response {
    result: 'success' | 'error';
  }
}
