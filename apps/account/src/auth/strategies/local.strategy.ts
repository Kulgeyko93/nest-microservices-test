import { UserService } from './../../user/user.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<any> {
    try {
      return this.userService.verifyUser(email, password);
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }
}
