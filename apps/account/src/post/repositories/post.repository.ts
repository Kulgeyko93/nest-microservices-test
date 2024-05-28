import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository, PostEntity } from '@lib/common';

@Injectable()
export class PostRepository extends AbstractRepository<PostEntity> {
  protected logger: Logger;

  constructor(
    @InjectRepository(PostEntity)
    protected repository: Repository<PostEntity>,
  ) {
    super();
  }
}
