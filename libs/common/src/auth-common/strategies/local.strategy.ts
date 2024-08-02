import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UserEntity } from '@lib/common/database';
import { UserEntityEC } from '@apps/account/src/user/entity-components/user.ec';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<any> {
    try {
      return this.verifyUser(email, password);
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }

  async verifyUser(email: string, password: string) {
    const user = await this.entityManager
      .createQueryBuilder()
      .from(UserEntity, 'user')
      .where('user.email = :email', {
        email,
      })
      .getOneOrFail();

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
}
