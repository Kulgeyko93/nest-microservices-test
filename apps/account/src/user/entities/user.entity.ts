import { compare, genSalt, hash } from 'bcrypt';
import { IUserModel } from '../../../../../libs/common/src';

export class UserEntity implements IUserModel {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  refreshToken: string;

  constructor(user: Pick<IUserModel, 'email' | 'password'>) {
    this.email = user.email;
    this.password = user.password;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.password = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.password);
  }

  public validateRefreshToken(refreshToken: string) {
    return compare(refreshToken, this.refreshToken);
  }
}
