import { IUserModel } from '@lib/common';

export class RegisterUserDto implements Pick<IUserModel, 'email' | 'password'> {
  email: string;
  password: string;
}
