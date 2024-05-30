import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from '@lib/common';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessTokenGuard } from '../auth/guards/gql-auth-access-token.guard';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly usersRepository: UserRepository) {}

  @Query(() => [UserEntity], { name: 'users' })
  @UseGuards(GqlAuthAccessTokenGuard)
  findAll() {
    return this.usersRepository.find({});
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
