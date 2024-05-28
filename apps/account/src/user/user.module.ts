import { DatabaseModule } from '@lib/common';
import { Module } from '@nestjs/common';
import { UserEntity } from '@lib/common';
import { UserRepository } from './repositories/user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository, UserResolver],
  exports: [UserService, UserRepository],
})
export class UserModule {}
