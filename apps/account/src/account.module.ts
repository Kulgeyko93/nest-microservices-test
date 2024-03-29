import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
