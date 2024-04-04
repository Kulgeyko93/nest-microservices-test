import { compare, genSalt, hash } from 'bcryptjs';

export class UserUpdateEntity {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  refreshToken: string;

  public async setRefreshToken(refreshToken: string) {
    const salt = await genSalt(15);
    this.refreshToken = await hash(refreshToken, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.password);
  }
}
