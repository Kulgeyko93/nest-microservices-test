import { FileTypes } from '../constants';
import { IUserEntityContract } from '../user/user.contract';

export interface FileEntityContract {
  id: string;
  fileUrl: string;
  type: FileTypes;

  userId: string;
  user?: IUserEntityContract;

  createdAt: Date;
  updatedAt: Date;
}
