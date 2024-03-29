import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { accountEnvConfig } from '../core/configs/env.config';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot(accountEnvConfig())],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
