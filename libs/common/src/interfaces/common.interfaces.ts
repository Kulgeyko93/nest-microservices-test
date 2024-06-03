import { IUserEntityContract } from '../contracts';

export type NoUndefinedField<T> = {
  [P in keyof T]: Exclude<T[P], null | undefined>;
};

export interface ResponseWithUser extends Request {
  user: IUserEntityContract;
}

export interface ICreatePostStep {
  userId: string;
  content: string;
  fileIds: string[];
}
