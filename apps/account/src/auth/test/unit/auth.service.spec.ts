import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth.service';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../../user/repositories/user.repository';
import { IUserModel } from '@lib/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../../user/entities/user.entity';
import { UserModel } from '../../../user/models/user.model';
// import { UserEntity } from '../../../user/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  // let config: ConfigService;
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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ConfigService,
        JwtService,
        // {
        //   provide: ConfigService,
        //   useValue: jest.fn((key: string) => {
        //     if (key === 'JWT_ACCESS_SECRET') return 'JWT_ACCESS_SECRET';
        //     if (key === 'JWT_ACCESS_EXPIRES') return 'JWT_ACCESS_EXPIRES';
        //     if (key === 'JWT_REFRESH_SECRET') return 'JWT_REFRESH_SECRET';
        //     if (key === 'JWT_REFRESH_EXPIRES') return 'JWT_REFRESH_EXPIRES';

        //     return null;
        //   }),
        // },
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
    // config = module.get<ConfigService>(ConfigService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

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
