import { PostEntity } from '@lib/common';

export interface PostInitData {
  userId: string;
  content: string;
  file: Express.Multer.File;
}

export interface PostPayload {
  post?: PostEntity;
  url?: string;
  filename?: string;
}
