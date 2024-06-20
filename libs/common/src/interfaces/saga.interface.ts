import { BufferedFile } from '@apps/feed/src/modules/minio/helpers/interfaces';
import { MinioBuckets } from '../contracts';

export abstract class SagaStep<I, IR, C, CR> {
  name: string;
  abstract invoke(params: I): Promise<IR>;
  abstract withCompensation(params: C): Promise<CR>;
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
