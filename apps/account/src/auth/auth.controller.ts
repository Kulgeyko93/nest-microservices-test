import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    const payload = await this.authService.verifyAccessToken(
      data.Authorization,
    );
    return payload;
  }
}
