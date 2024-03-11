import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserDocument } from './models/user.schema';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
