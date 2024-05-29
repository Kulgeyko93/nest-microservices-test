import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { getJWTConfig } from './core/configs/jwt.config';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register(getJWTConfig()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResolver,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
