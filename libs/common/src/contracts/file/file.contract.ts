import { IUserModel } from '../user/user.contract';

export interface IFileModel {
  id: string;
  fileUrl: string;
  type: string;

  user?: IUserModel;

  createdAt: Date;
  updatedAt: Date;
}
