import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository, FileEntity } from '@lib/common';

@Injectable()
export class UploadRepository extends AbstractRepository<FileEntity> {
  protected logger: Logger;

  constructor(
    @InjectRepository(FileEntity)
    protected repository: Repository<FileEntity>,
  ) {
    super();
  }

  async createOrUpdate(payload: Pick<FileEntity, 'url' | 'userId'>) {
    const file = await this.findOne({ userId: payload.userId });

    if (!file) {
      return await this.create(payload);
    }

    await this.update({ userId: payload.userId }, { url: payload.url });
  }
}
