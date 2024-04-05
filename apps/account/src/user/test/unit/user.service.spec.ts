import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user.service';
import { UserRepository } from '../../repositories/user.repository';
import { UserEntity } from '../../entities/user.entity';

describe('UserService', () => {
  let service: UserService;

  const mockUser = {
    id: '123',
    email: '123',
    password: '123',
    refreshToken: '123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

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

  it('verifyUser is "not found exception"', async () => {
    try {
      mockUserRepository.findOne.mockReturnValue(null);
      await service.verifyUser(mockUser.email, mockUser.password);
    } catch (error) {
      expect(error).toHaveProperty('name', 'NotFoundException');
      expect(error).toHaveProperty('message', 'Document was not found');
    }
  });

  it('verifyUser is invalid password', async () => {
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

  it('verifyUser is invalid password', async () => {
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
