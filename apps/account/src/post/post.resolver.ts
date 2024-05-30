import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostRepository } from './repositories/post.repository';
import { CurrentGqlUser, IUserEntityContract, PostEntity } from '@lib/common';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { GqlAuthAccessTokenGuard } from '../auth/guards/gql-auth-access-token.guard';

@Resolver(() => PostEntity)
@UseGuards(GqlAuthAccessTokenGuard)
export class PostResolver {
  constructor(private readonly postRepository: PostRepository) {}

  @Query(() => [PostEntity], { name: 'posts' })
  findAll(@CurrentGqlUser() user: IUserEntityContract) {
    if (!user) {
      throw new BadRequestException('empty user');
    }
    return this.postRepository.find({ userId: user.id });
  }

  @Query(() => PostEntity, { name: 'post' })
  findOne(
    @Args('id', { type: () => String }) id: string,
    @CurrentGqlUser() user: IUserEntityContract,
  ) {
    return this.postRepository.findOne({ id, userId: user.id });
  }
}
