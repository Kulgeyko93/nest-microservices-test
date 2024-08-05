import { Test, TestingModule } from '@nestjs/testing';
import { getMockUserData } from './mock-parameters';
import { UserRepository } from '@apps/account/src/user/repositories/user.repository';
import { UserService } from '@apps/account/src/user/user.service';
import { UserEntity } from '@lib/common';

describe('UserService', () => {
  let service: UserService;

  const mockUser = getMockUserData();
  const mockUserRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('verifyUser has error "not found exception"', async () => {
    try {
      mockUserRepository.findOne.mockReturnValue(null);
      await service.verifyUser(mockUser.email, mockUser.password);
    } catch (error) {
      expect(error).toHaveProperty('name', 'NotFoundException');
      expect(error).toHaveProperty('message', "User doest't exist");
    }
  });

  it('verifyUser has invalid password', async () => {
    try {
      const passwordWithPostfix = mockUser.password + '123';
      const mockPassword = (
        await new UserEntity(mockUser).setPassword(passwordWithPostfix)
      ).password;

      mockUserRepository.findOne.mockImplementation(({ email }) => ({
        ...mockUser,
        email,
        password: mockPassword,
      }));

      await service.verifyUser(mockUser.email, mockUser.password);
    } catch (error) {
      expect(error).toHaveProperty('name', 'UnauthorizedException');
      expect(error).toHaveProperty('message', 'Credentials are not valid.');
    }
  });

  it('verifyUser has invalid password', async () => {
    const passwordWithPostfix = mockUser.password;
    const mockPassword = (
      await new UserEntity(mockUser).setPassword(passwordWithPostfix)
    ).password;

    const mockUserWithHashedPass = {
      ...mockUser,
      password: mockPassword,
    };

    mockUserRepository.findOne.mockImplementation(({ email }) => ({
      ...mockUserWithHashedPass,
      email,
    }));

    const res = await service.verifyUser(mockUser.email, mockUser.password);

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      email: mockUser.email,
    });
    expect(res).toEqual(mockUserWithHashedPass);
  });
});
