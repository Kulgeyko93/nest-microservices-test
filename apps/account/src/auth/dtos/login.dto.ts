import { IUserModel } from '@lib/common';

export class LoginDto implements Pick<IUserModel, 'email' | 'password'> {
  email: string;
  password: string;
}
