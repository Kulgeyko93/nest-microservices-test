import { IUserModel } from '@lib/common';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUserModel {
  id: string;
  email: string;
  password: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: Pick<IUserModel, 'email' | 'password' | 'refreshToken'>) {
    this.email = user.email;
    this.password = user.password;
    this.refreshToken = user.refreshToken;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.password = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.password);
  }

  public validateRefreshToken(refreshToken: string | null) {
    if (!refreshToken) return false;
    return compare(refreshToken, this.refreshToken);
  }
}
