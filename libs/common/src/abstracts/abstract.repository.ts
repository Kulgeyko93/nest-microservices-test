import { Logger } from '@nestjs/common';
import {
  DeepPartial,
  DeleteResult,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends ObjectLiteral> {
  protected abstract readonly logger: Logger;

  protected repository: Repository<T>;

  create(dto: DeepPartial<T>): Promise<T> {
    const prepared = this.repository.create(dto);
    return this.repository.save(prepared);
  }

  findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T | null> {
    return this.repository.findOne({
      where,
      relations,
    });
  }

  find(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T[]> {
    return this.repository.find({
      where,
      relations,
    });
  }

  async updateById(
    where: FindOptionsWhere<Pick<T, 'id'>>,
    data: QueryDeepPartialEntity<T>,
  ): Promise<T | null> {
    await this.repository.update(where, data);

    return this.findOne(where);
  }

  async update(
    where: FindOptionsWhere<T>,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return this.repository.update(where, data);
  }

  remove(where: FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.repository.delete(where);
  }
}
