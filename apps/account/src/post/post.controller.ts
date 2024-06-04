import { PostRepository } from './repositories/post.repository';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePostUser } from '@lib/common';

@Controller('post')
export class PostController {
  constructor(private readonly postRepository: PostRepository) {}

  @MessagePattern(CreatePostUser.topic)
  async createPost(@Payload() data: CreatePostUser.Request) {
    // await this.postRepository.create({
    //   userId,
    //   content,
    //   files,
    // });
    console.log(data);
    console.log('adasdsa');
    console.log('adasdsa');
    console.log('adasdsa');
    console.log('adasdsa');
    console.log('adasdsa');
    return 'asdasdas';
  }
}
