import { IFileModel } from '../file/file.contract';

export interface IUserModel {
  id: string;
  email: string;
  password: string;
  refreshToken: string;

  avatar?: IFileModel;

  createdAt: Date;
  updatedAt: Date;
}
