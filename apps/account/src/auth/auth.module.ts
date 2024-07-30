import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthCommonModule } from '@lib/common/auth-common';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '@lib/common';

@Module({
  imports: [
    UserModule,
    AuthCommonModule,
    // PassportModule.register({
    //   defaultStrategy: 'jwt',
    // }),
    JwtModule.register(getJWTConfig()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResolver,
    // AccessTokenStrategy,
    // LocalStrategy,
    // RefreshTokenStrategy,
  ],
})
export class AuthModule {}
