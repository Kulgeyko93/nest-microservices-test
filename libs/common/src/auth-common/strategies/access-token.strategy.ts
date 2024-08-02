import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtStrategyName } from '../helpers/constants';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UserEntity } from '@lib/common/database';
import { JwtPayload } from '../helpers/types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  JwtStrategyName.JWT,
) {
  constructor(
    public readonly config: ConfigService,

    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_ACCESS_SECRET'),
    });
  }

  public async validate({ email }: JwtPayload) {
    const userRepository = this.entityManager.getRepository(UserEntity);

    const user = await userRepository.findOne({
      where: { email },
    });

    return user;
  }
}
