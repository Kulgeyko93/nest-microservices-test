import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth.service';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../../user/repositories/user.repository';
import { IUserModel } from '@lib/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../../../user/models/user.model';
import { UserEntity } from '../../../user/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let config: ConfigService;
  let jwtService: JwtService;
  let userRepository: UserRepository;

  const mockTokens = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  };

  const mockUser: IUserModel = {
    id: '123',
    email: '123',
    password: '123',
    refreshToken: '123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    jest.setTimeout(60000);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => ({
              JWT_REFRESH_SECRET: 'JWT_REFRESH_SECRET_MOCK',
              JWT_REFRESH_EXPIRES: '20d',
            })),
          },
        },
        JwtService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    config = module.get<ConfigService>(ConfigService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('register method', () => {
    it('register is working', async () => {
      jest.spyOn(userRepository, 'findOne').mockImplementation(async () => {
        return null;
      });

      jest.spyOn(userRepository, 'create').mockImplementation(async () => {
        return mockUser as UserModel;
      });

      jest.spyOn(service, 'getTokens').mockResolvedValue(mockTokens);

      jest.spyOn(service, 'updateRefreshToken').mockResolvedValue();

      const res = await service.register(mockUser);

      expect(res).toEqual(mockTokens);
    });

    it('register is error "exist user"', async () => {
      try {
        jest
          .spyOn(userRepository, 'findOne')
          .mockImplementation(async () => mockUser);

        const res = await service.register(mockUser);

        expect(res).toEqual(mockTokens);
      } catch (error) {
        expect(error).toHaveProperty('name', 'BadRequestException');
        expect(error).toHaveProperty('message', 'User exists');
      }
    });
  });

  describe('refreshTokens method', () => {
    it('refreshTokens is working', async () => {
      // const JWT_REFRESH_SECRET =
      //   config.get('JWT_REFRESH_SECRET').JWT_REFRESH_SECRET;
      // const JWT_REFRESH_EXPIRES = config.get(
      //   'JWT_REFRESH_EXPIRES',
      // ).JWT_REFRESH_EXPIRES;

      // const mockRefreshToken = await jwtService.signAsync(
      //   {
      //     sub: mockUser.id,
      //     email: mockUser.email,
      //   },
      //   {
      //     secret: JWT_REFRESH_SECRET,
      //     expiresIn: JWT_REFRESH_EXPIRES,
      //   },
      // );

      const hashedMockUserRefreshToken = (
        await new UserEntity(mockUser).setPassword(mockUser.refreshToken)
      ).password;

      jest.spyOn(userRepository, 'findOne').mockImplementation(async () => {
        return {
          ...mockUser,
          refreshToken: hashedMockUserRefreshToken,
        };
      });

      jest.spyOn(service, 'updateRefreshToken').mockResolvedValue();

      jest.spyOn(service, 'getTokens').mockResolvedValue(mockTokens);

      const res = await service.refreshTokens(
        mockUser.email,
        mockUser.password,
      );

      expect(res).toEqual(mockTokens);
    });
  });
});
