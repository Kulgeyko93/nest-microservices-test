import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from '@lib/common';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly usersRepository: UserRepository) {}

  @Query(() => [UserEntity], { name: 'users' })
  findAll() {
    return this.usersRepository.find({});
  }

  @Query(() => UserEntity, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersRepository.findOne({ id });
  }

  @Mutation(() => UserEntity)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersRepository.remove({ id });
  }
}
