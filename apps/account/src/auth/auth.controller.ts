import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountMessageNames } from '@lib/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AccountMessageNames.Authenticate)
  async authenticate(@Payload() data: any) {
    const payload = await this.authService.verifyAccessToken(
      data.Authorization,
    );

    return payload;
  }
}
