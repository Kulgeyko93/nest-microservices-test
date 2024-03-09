import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtAuthConfig, LoggerModule } from '@app/common';

@Module({
  imports: [UsersModule, LoggerModule, JwtModule.registerAsync(jwtAuthConfig())],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
