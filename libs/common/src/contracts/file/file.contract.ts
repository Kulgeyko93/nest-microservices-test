import { IUserEntityContract } from '../user/user.contract';

export interface FileEntityContract {
  id: string;
  fileUrl: string;

  userId: string;
  user?: IUserEntityContract;

  createdAt: Date;
  updatedAt: Date;
}
