import { DatabaseModule } from '@lib/common';
import { Module } from '@nestjs/common';
import { PostEntity } from '@lib/common';
import { PostResolver } from './post.resolver';
import { PostRepository } from './repositories/post.repository';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([PostEntity])],
  providers: [PostService, PostRepository, PostResolver],
  controllers: [PostController],
  exports: [PostService, PostRepository],
})
export class PostModule {}
