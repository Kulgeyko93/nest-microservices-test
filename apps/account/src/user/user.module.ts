import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';
import { DatabaseModule } from '@lib/common';
import { UserModel } from './models/user.model';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([UserModel])],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
