import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtAuthConfig, LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { authEnvConfig } from './configs/env.config';

@Module({
  imports: [UsersModule, LoggerModule, ConfigModule.forRoot(authEnvConfig()), JwtModule.registerAsync(jwtAuthConfig())],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
