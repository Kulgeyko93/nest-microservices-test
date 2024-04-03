import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model';
import { IUserModel, NoUndefinedField } from '@lib/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async create(user: IUserModel) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);

    return newUser;
  }

  async findOne(filter: Partial<NoUndefinedField<IUserModel>>) {
    return this.userRepository.findOne({
      where: filter,
    });
  }

  async find() {
    return this.userRepository.find();
  }

  async update(
    filter: Partial<NoUndefinedField<IUserModel>>,
    payload: Partial<IUserModel>,
  ) {
    return this.userRepository.update(filter, payload);
  }

  async remove(filter: Partial<NoUndefinedField<IUserModel>>) {
    return this.userRepository.delete(filter);
  }
}
