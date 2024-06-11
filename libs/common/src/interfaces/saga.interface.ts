import { BufferedFile } from '@apps/feed/src/modules/minio/helpers/interfaces';
import { MinioBuckets } from '../contracts';

export abstract class SagaStep<T, R> {
  name: string;
  abstract invoke(params: T): Promise<R>;
  abstract withCompensation(params: T): Promise<R>;
}

export interface UploadPostFilesStep {
  file: Express.Multer.File;
  userId: string;
}

export interface FilePayload {
  userId: string;
  baseBucket: MinioBuckets;
}

export interface StoreFilePayload extends FilePayload {
  file: Express.Multer.File;
}

export interface UploadFilePayload extends FilePayload {
  file: BufferedFile;
}
