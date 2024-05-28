import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostRepository } from './repositories/post.repository';
import { CurrentGqlUser, IUserEntityContract, PostEntity } from '@lib/common';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessTokenGuard } from '../auth/guards/gql-auth-access-token.guard';

@Resolver(() => PostEntity)
export class PostResolver {
  constructor(private readonly postRepository: PostRepository) {}

  @Query(() => [PostEntity], { name: 'posts' })
  @UseGuards(GqlAuthAccessTokenGuard)
  findAll(@CurrentGqlUser() user: IUserEntityContract) {
    return this.postRepository.find({ userId: user.id });
  }

  @Query(() => PostEntity, { name: 'post' })
  @UseGuards(GqlAuthAccessTokenGuard)
  findOne(
    @Args('id', { type: () => String }) id: string,
    @CurrentGqlUser() user: IUserEntityContract,
  ) {
    return this.postRepository.findOne({ id, userId: user.id });
  }
}
