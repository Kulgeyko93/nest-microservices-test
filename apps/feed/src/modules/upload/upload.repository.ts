import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { FileEntityContract } from '@lib/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UploadRepository {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {
    this.logger = new Logger('UploadRepository');
  }

  async createOrUpdate(
    payload: Pick<FileEntityContract, 'fileUrl' | 'userId' | 'type'>,
  ) {
    const file = await this.findOne({ userId: payload.userId });

    if (!file) {
      return await this.create(payload);
    }

    return await this.update(
      { userId: payload.userId },
      { fileUrl: payload.fileUrl },
    );
  }

  async create(
    payload: Pick<FileEntityContract, 'fileUrl' | 'userId' | 'type'>,
  ) {
    const file = this.fileRepository.create(payload);
    await this.fileRepository.save(file);

    return file;
  }

  async findOne(
    criteria: FindOptionsWhere<FileEntity> | FindOptionsWhere<FileEntity>[],
  ) {
    return this.fileRepository.findOne({ where: criteria });
  }

  async update(
    criteria: FindOptionsWhere<FileEntity>,
    data: QueryDeepPartialEntity<FileEntity>,
  ) {
    await this.fileRepository.update(criteria, data);

    const updatedFile = await this.findOne(criteria);

    return updatedFile;
  }
}
