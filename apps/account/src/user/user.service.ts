import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserEntityEC } from './entity-components/user.ec';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException("User doest't exist");
    }

    const userEntity = new UserEntityEC(user);
    const passwordIsValid = userEntity.validatePassword(password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }
}
