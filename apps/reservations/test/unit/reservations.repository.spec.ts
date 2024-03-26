import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ReservationDocument } from '../../src/models/reservations.schema';
import { ReservationsRepository } from '../../src/reservations.repository';

describe('ReservationsRepository', () => {
  let service: ReservationsRepository;

  const lean = { lean: jest.fn() };
  const toJSON = { toJSON: jest.fn() };
  const save = { save: async () => toJSON };

  const reservationsRepositoryFactory = () => ({
    findOne: () => lean,
    find: () => lean,
    findOneAndUpdate: () => lean,
    findOneAndDelete: () => lean,
    create: () => {},
    model: (mockResult: any) => {
      return {
        model: jest.fn().mockResolvedValue({ toJSON: () => ({ ...mockResult, _id: expect.any(Types.ObjectId) }) }),
      };
    },
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsRepository,
        {
          useFactory: reservationsRepositoryFactory,
          provide: getModelToken(ReservationDocument.name),
        },
      ],
    }).compile();

    service = module.get<ReservationsRepository>(ReservationsRepository);
  });

  it('Create is working', async () => {
    const _id = new Types.ObjectId().toHexString();
    const userId = new Types.ObjectId().toHexString();

    const mockResult = {
      userId,
      startDate: new Date('12-23-2023'),
      endDate: new Date('12-25-2023'),
      placeId: '123131',
      invoiceId: '1',
      timestamp: new Date(),
    };

    // const mockDocument = {
    //   ...mockResult,
    //   _id: new Types.ObjectId(),
    //   save: jest.fn().mockResolvedValue({ toJSON: () => ({ ...documentData, _id: expect.any(Types.ObjectId) }) }),
    // };

    // reservationsRepositoryFactory()
    //   .create()
    //   .mockImplementationOnce(() => {
    //     model: () =>
    //       jest.mockImplementationOnce(() => {
    //         save;
    //       });
    //   });

    // (await reservationsRepositoryFactory().create()).mockReturnValueOnce({ _id, ...mockResult });

    reservationsRepositoryFactory().create();
    // mockReturnValueOnce({ _id, ...mockResult });

    const res = await service.create(mockResult);

    expect(res.userId).toBe(userId);
    expect(res._id).toBe(_id);
  });

  it('findOne by objectId is working', async () => {
    const _id = new Types.ObjectId().toHexString();
    reservationsRepositoryFactory().findOne().lean.mockReturnValueOnce({ _id });

    const res = await service.findOne({ _id: _id });

    expect(res._id).toBe(_id);
  });

  it('findOne by objectId. Document was not found', async () => {
    const unExistId = new Types.ObjectId().toHexString();

    try {
      await service.findOne({ _id: unExistId });
    } catch (error) {
      expect(error).toHaveProperty('name', 'NotFoundException');
      expect(error).toHaveProperty('message', 'Document was not found');
    }
  });

  it('find is working', async () => {
    const _id = new Types.ObjectId().toHexString();
    reservationsRepositoryFactory().findOne().lean.mockReturnValueOnce([{ _id }]);

    const res = await service.find({ _id: _id });

    expect(res[0]._id).toBe(_id);
  });

  it('findOneAndUpdate is working', async () => {
    const _id = new Types.ObjectId().toHexString();
    const userId = new Types.ObjectId().toHexString();
    reservationsRepositoryFactory().findOneAndUpdate().lean.mockReturnValueOnce({ _id, userId });

    const res = await service.findOneAndUpdate({ _id }, { userId });

    expect(res._id).toBe(_id);
    expect(res.userId).toBe(userId);
  });

  it('findOneAndUpdate is working. Document was not found', async () => {
    const _id = new Types.ObjectId().toHexString();
    const userId = new Types.ObjectId().toHexString();
    try {
      await service.findOneAndUpdate({ _id }, { userId });
    } catch (error) {
      expect(error).toHaveProperty('name', 'NotFoundException');
      expect(error).toHaveProperty('message', 'Document was not found');
    }
  });

  it('findOneAndDelete is working', async () => {
    const _id = new Types.ObjectId().toHexString();
    reservationsRepositoryFactory().findOneAndDelete().lean.mockReturnValueOnce({ _id });

    const res = await service.findOneAndDelete({ _id });
    expect(res?._id).toBe(_id);
  });

  it('findOneAndDelete is working. Nullable result ', async () => {
    const _id = new Types.ObjectId().toHexString();
    reservationsRepositoryFactory().findOneAndDelete().lean.mockReturnValueOnce(null);

    const res = await service.findOneAndDelete({ _id });

    expect(res).toBeNull();
  });
});
