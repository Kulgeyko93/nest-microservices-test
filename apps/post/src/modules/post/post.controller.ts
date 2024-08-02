import { PostRepository } from './repositories/post.repository';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePostUser, DeletePostUser } from '@lib/common';

@Controller('post')
export class PostController {
  constructor(private readonly postRepository: PostRepository) {}

  @MessagePattern(CreatePostUser.topic)
  async createPost(@Payload() data: CreatePostUser.Request) {
    try {
      const post = await this.postRepository.create(data);

      return JSON.stringify(post);
    } catch (error) {
      console.error(error?.message);
      return null;
    }
  }

  @MessagePattern(DeletePostUser.topic)
  async deletePost(@Payload() data: DeletePostUser.Request) {
    try {
      const post = await this.postRepository.remove({
        id: data.id,
      });

      return post;
    } catch (error) {
      console.error(error?.message);
      return null;
    }
  }
}
