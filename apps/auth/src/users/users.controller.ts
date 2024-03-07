import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }
}
