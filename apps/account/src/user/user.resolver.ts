import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRepository } from './repositories/user.repository';
import { CurrentGqlUser, UserEntity } from '@lib/common';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessTokenGuard } from '@lib/common/auth-common';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly usersRepository: UserRepository) {}

  @Query(() => [UserEntity], { name: 'users' })
  @UseGuards(GqlAuthAccessTokenGuard)
  findAll() {
    return this.usersRepository.find({});
  }

  @Query(() => UserEntity, { name: 'me' })
  @UseGuards(GqlAuthAccessTokenGuard)
  findMe(@CurrentGqlUser() user: UserEntity) {
    return user;
  }

  @Query(() => UserEntity, { name: 'user' })
  @UseGuards(GqlAuthAccessTokenGuard)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersRepository.findOne({ id });
  }

  @Mutation(() => UserEntity)
  @UseGuards(GqlAuthAccessTokenGuard)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersRepository.remove({ id });
  }
}
