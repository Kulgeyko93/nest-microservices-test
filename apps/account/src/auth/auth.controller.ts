import { UserService } from './../user/user.service';
import { Controller, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountMessageNames } from '@lib/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @MessagePattern(AccountMessageNames.Authenticate)
  async authenticate(@Payload() data: any) {
    const payload = await this.authService.verifyAccessToken(
      data.Authorization,
    );

    if (!payload.email) throw new NotFoundException();

    const user = await this.userService.findByEmail(payload.email);

    if (!user) throw new NotFoundException();

    return user;
  }
}
