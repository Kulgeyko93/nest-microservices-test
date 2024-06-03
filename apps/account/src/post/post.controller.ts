import { PostRepository } from './repositories/post.repository';
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePostUser } from '@lib/common';

@Controller('post')
export class PostController {
  constructor(private readonly postRepository: PostRepository) {}

  @MessagePattern(CreatePostUser.topic)
  async createPost(@Payload() data: any) {
    // await this.postRepository.create({
    //   userId,
    //   content,
    //   files,
    // });
    console.log('adasdsa');
    console.log('adasdsa');
    console.log('adasdsa');
    console.log('adasdsa');
    console.log('adasdsa');
    console.log('adasdsa');
    return 'asdasdas';
  }
}
