import { BufferedFile } from '@apps/feed/src/modules/minio/helpers/interfaces';
import { MinioBuckets } from '../contracts';

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
