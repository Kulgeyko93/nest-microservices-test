import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtAuthConfig = (): JwtModuleAsyncOptions => ({
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: `${configService.get<string>('JWT_EXPIRATION')}s`,
    },
  }),
});
