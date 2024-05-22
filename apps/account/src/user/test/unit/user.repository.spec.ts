import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../repositories/user.repository';
import { Repository } from 'typeorm';
import { UserModel } from '../../entities/user.model';
import { MockType } from '../../repositories/common';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let repositoryMock: MockType<Repository<UserModel>>;

  const mockUser = {
    id: '123',
    email: '123',
    password: '123',
    refreshToken: '123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      create: jest.fn((entity) => entity),
      save: jest.fn((entity) => entity),
      findOne: jest.fn((entity) => entity),
      find: jest.fn((entity) => entity),
      update: jest.fn((entity) => entity),
      remove: jest.fn((entity) => entity),
    }),
  );

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserModel),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    userRepository = app.get<UserRepository>(UserRepository);
    repositoryMock = app.get(getRepositoryToken(UserModel));
  });

  describe('UserRepository methods:', () => {
    it('findOne is working', async () => {
      repositoryMock.findOne?.mockReturnValue(mockUser);
      const result = await userRepository.findOne({ id: mockUser.id });

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
      expect(result).toEqual(mockUser);
    });

    it('create is working', async () => {
      repositoryMock.create?.mockReturnValue(mockUser);
      repositoryMock.save?.mockReturnValue(mockUser);
      const result = await userRepository.create(mockUser);

      expect(repositoryMock.create).toHaveBeenCalledWith(mockUser);
      expect(repositoryMock.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });
});
