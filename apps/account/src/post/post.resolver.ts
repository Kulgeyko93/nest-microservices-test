import { Resolver } from '@nestjs/graphql';
import { PostRepository } from './repositories/post.repository';
import { PostEntity } from '@lib/common';

@Resolver(() => PostEntity)
export class PostResolver {
  constructor(private readonly postRepository: PostRepository) {}

  // @Query(() => [PostEntity], { name: 'posts' })
  // findAll() {
  //   return this.postRepository.find();
  // }

  // @Query(() => PostEntity, { name: 'posts' })
  // findOne(@Args('id', { type: () => String }) id: string) {
  //   return this.postRepository.findOne({ id });
  // }

  // @Mutation(() => PostEntity)
  // removeUser(@Args('id', { type: () => String }) id: string) {
  //   return this.postRepository.remove({ id });
  // }
}
