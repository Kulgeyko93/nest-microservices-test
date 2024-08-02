import { Injectable } from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}
}
