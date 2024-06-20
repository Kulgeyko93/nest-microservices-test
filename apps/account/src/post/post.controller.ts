import { PostRepository } from './repositories/post.repository';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePostUser } from '@lib/common';

@Controller('post')
export class PostController {
  constructor(private readonly postRepository: PostRepository) {}

  @MessagePattern(CreatePostUser.topic)
  async createPost(@Payload() data: CreatePostUser.Request) {
    try {
      const post = await this.postRepository.create({
        userId: data.userId,
        content: data.content,
        files: data.files,
      });

      return post;
    } catch (error) {
      console.error(error?.message);
      return null;
    }
  }
}
