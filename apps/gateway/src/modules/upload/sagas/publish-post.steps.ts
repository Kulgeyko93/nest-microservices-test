import { lastValueFrom } from 'rxjs';
import { PublishPostSagaState } from './publish-post.state';

export class PublishPostSagaStateUploadFiles extends PublishPostSagaState {
  constructor() {
    super();
  }
  public async uploadFiles(): Promise<any> {
    const uploadedFile = await this.sendFiles(this.saga.file);
  }
  public publishPost(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public rejectPost(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  private async sendFiles(files: Express.Multer.File): Promise<any> {
    const response = await lastValueFrom(
      this.saga.httpService.post(`http://localhost:3040/upload/post`, files, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    );
    return response.data;
  }
}
