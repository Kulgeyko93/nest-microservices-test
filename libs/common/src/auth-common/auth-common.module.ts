import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { commonEnvConfig, getJWTConfig } from '../configs';
import {
  AccessTokenStrategy,
  LocalStrategy,
  RefreshTokenStrategy,
} from './strategies';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database';

@Module({
  imports: [
    ConfigModule.forRoot(commonEnvConfig()),
    DatabaseModule,
    DatabaseModule.forFeature([]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register(getJWTConfig()),
  ],
  providers: [AccessTokenStrategy, LocalStrategy, RefreshTokenStrategy],
})
export class AuthCommonModule {}
