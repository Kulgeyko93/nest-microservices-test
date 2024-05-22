import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth.service';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../../user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../../../user/entities/user.model';
import { UserEntity } from '../../../user/entity-components/user.entity';
import { getMockUserData } from '../../../user/test/unit/mock-parameters';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: UserRepository;

  const mockTokens = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  };

  const mockUser = getMockUserData();

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

    it('register sends error "exist user"', async () => {
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

    it('refreshTokens sends error "Access Denied". didn\'t exist user', async () => {
      try {
        jest.spyOn(userRepository, 'findOne').mockImplementation(async () => {
          return null;
        });
        await service.refreshTokens(mockUser.email, mockUser.password);
      } catch (error) {
        expect(error).toHaveProperty('name', 'ForbiddenException');
        expect(error).toHaveProperty('message', 'Access Denied');
      }
    });

    it('refreshTokens sends error "Access Denied". didn\'t exist token', async () => {
      try {
        jest.spyOn(userRepository, 'findOne').mockImplementation(async () => {
          return {
            ...mockUser,
            refreshToken: 'hashedMockUserRefreshToken',
          };
        });
        await service.refreshTokens(mockUser.email, '');
      } catch (error) {
        expect(error).toHaveProperty('name', 'ForbiddenException');
        expect(error).toHaveProperty('message', 'Access Denied');
      }
    });

    it('refreshTokens sends error "Access Denied". didn\'t exist token', async () => {
      try {
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

        await service.refreshTokens(mockUser.email, mockUser.password + '2');
      } catch (error) {
        expect(error).toHaveProperty('name', 'ForbiddenException');
        expect(error).toHaveProperty('message', 'Access Denied');
      }
    });
  });
});
