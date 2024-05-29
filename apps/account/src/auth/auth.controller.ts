import { UserService } from './../user/user.service';
import { Controller, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { AccountValidateUser } from '@lib/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @MessagePattern(AccountValidateUser.topic)
  async authenticate(
    @Payload() data: AccountValidateUser.Request,
    @Ctx() context: KafkaContext,
  ) {
    try {
      const payload = await this.authService.verifyAccessToken(data.token);

      if (!payload.email) return null;

      const user = await this.userService.findByEmail(payload.email);

      if (!user) return null;

      return user;
    } catch (error) {
      return null;
    }
  }
}
