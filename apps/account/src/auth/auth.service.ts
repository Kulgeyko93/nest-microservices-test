import { IUserModel } from '@lib/common';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserUpdateEntity } from '../user/entities/user-update.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/repositories/user.repository';
import { LoginInput } from './inputs/login.input';
import { RegisterUserInput } from './inputs/register-user.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async register({ email, password }: RegisterUserInput) {
    const existUser = await this.userRepository.findOne({ email });

    if (existUser) {
      throw new BadRequestException('User exists');
    }

    const newUserEntity = await new UserEntity({
      email,
      password: '',
      refreshToken: '',
    }).setPassword(password);

    const newUser = await this.userRepository.create(newUserEntity);

    const tokens = await this.getTokens({
      id: newUser.id,
      email: newUser.email,
    });

    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async signIn({ email, password }: LoginInput) {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const userEntity = new UserEntity(user);
    const isCorrectPassword = await userEntity.validatePassword(password);

    if (!isCorrectPassword) {
      throw new BadRequestException('Password is incorrect');
    }

    const tokens = await this.getTokens({ id: user.id, email });
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    return this.userRepository.update({ id: userId }, { refreshToken: '' });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const updateEntity = new UserUpdateEntity();
    await updateEntity.setRefreshToken(refreshToken);

    await this.userRepository.update({ id: userId }, updateEntity);
  }

  async getTokens({ id, email }: Pick<IUserModel, 'id' | 'email'>) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(email: string, refreshToken: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const userEntity = new UserEntity(user);
    const refreshTokenMatches =
      await userEntity.validateRefreshToken(refreshToken);

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens({ id: user.id, email: user.email });

    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async verifyAccessToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });

      return payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
