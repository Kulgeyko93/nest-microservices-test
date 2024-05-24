import { IUserEntityContract } from '../contracts';

export type NoUndefinedField<T> = {
  [P in keyof T]: Exclude<T[P], null | undefined>;
};

export interface ResponseWithUser extends Request {
  user: IUserEntityContract;
}
