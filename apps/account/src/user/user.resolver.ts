import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRepository } from './repositories/user.repository';
import { UserModel } from './models/user.model';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly usersRepository: UserRepository) {}

  @Query(() => [UserModel], { name: 'users' })
  findAll() {
    return this.usersRepository.find();
  }

  @Query(() => UserModel, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersRepository.findOne({ id });
  }

  @Mutation(() => UserModel)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersRepository.remove({ id });
  }
}
