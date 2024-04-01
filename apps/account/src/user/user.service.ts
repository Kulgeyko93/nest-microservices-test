import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException("User doest't exist");
    }

    const userEntity = new UserEntity(user);
    const passwordIsValid = userEntity.validatePassword(password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return user;
  }
}
