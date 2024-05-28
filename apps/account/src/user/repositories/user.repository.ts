import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@lib/common';
import { IUserEntityContract } from '@lib/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: IUserEntityContract) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);

    return newUser;
  }

  async findOne(
    filter: Partial<IUserEntityContract>,
  ): Promise<IUserEntityContract | null> {
    return this.userRepository.findOne({
      where: filter,
    });
  }

  async find(): Promise<IUserEntityContract[]> {
    return this.userRepository.find();
  }

  async update(
    filter: Partial<IUserEntityContract>,
    payload: Partial<IUserEntityContract>,
  ) {
    return this.userRepository.update(filter, payload);
  }

  async remove(filter: Partial<IUserEntityContract>) {
    return this.userRepository.delete(filter);
  }
}
