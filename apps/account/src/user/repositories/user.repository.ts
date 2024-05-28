import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository, UserEntity } from '@lib/common';

@Injectable()
export class UserRepository extends AbstractRepository<UserEntity> {
  protected logger: Logger;

  constructor(
    @InjectRepository(UserEntity)
    protected userRepository: Repository<UserEntity>,
  ) {
    super();
  }
}
