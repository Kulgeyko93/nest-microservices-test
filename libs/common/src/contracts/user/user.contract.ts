import { FileEntityContract } from '../file/file.contract';

export interface IUserEntityContract {
  id: string;
  email: string;
  password: string;
  refreshToken: string;

  avatar?: FileEntityContract;

  createdAt: Date;
  updatedAt: Date;
}
