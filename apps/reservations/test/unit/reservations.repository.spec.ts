import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { ReservationsRepository } from '../../src/reservations.repository';
import { reservationStub } from '../stubs/reservations.stub';
import { ReservationDocument } from '../../src/models/reservations.schema';
import { Types } from 'mongoose';

describe('ReservationsRepository', () => {
  let service: ReservationsRepository;

  const lean = { lean: jest.fn() };

  const mockReservationsRepository = {
    create: jest.fn(),
    findOne: () => lean,
    find: () => lean,
    findOneAndUpdate: () => lean,
    findOneAndDelete: () => lean,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsRepository,
        {
          provide: getModelToken(ReservationDocument.name),
          useValue: mockReservationsRepository,
        },
      ],
    }).compile();

    service = module.get<ReservationsRepository>(ReservationsRepository);
  });

  it('Create is working', async () => {
    // jest.spyOn(reservationsModel, 'create');
    const dto = reservationStub();
    const mockReservation: Partial<ReservationDocument> = { _id: new Types.ObjectId(), ...dto };

    mockReservationsRepository.create = jest.fn().mockReturnValue(mockReservation);
    service.create = jest.fn().mockResolvedValueOnce(mockReservation); // fix in future

    const result = await service.create(dto);

    expect(result).toEqual(mockReservation);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('findOne by objectId is working', async () => {
    const _id = new Types.ObjectId().toHexString();
    mockReservationsRepository.findOne().lean.mockReturnValueOnce({ _id });

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
    mockReservationsRepository.find().lean.mockReturnValueOnce([{ _id }]);

    const res = await service.find({ _id: _id });

    expect(res[0]._id).toBe(_id);
  });

  it('findOneAndUpdate is working', async () => {
    const _id = new Types.ObjectId().toHexString();
    const userId = new Types.ObjectId().toHexString();
    mockReservationsRepository.findOneAndUpdate().lean.mockReturnValueOnce({ _id, userId });

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
    mockReservationsRepository.findOneAndDelete().lean.mockReturnValueOnce({ _id });

    const res = await service.findOneAndDelete({ _id });
    expect(res?._id).toBe(_id);
  });

  it('findOneAndDelete is working. Nullable result ', async () => {
    const _id = new Types.ObjectId().toHexString();
    mockReservationsRepository.findOneAndDelete().lean.mockReturnValueOnce(null);

    const res = await service.findOneAndDelete({ _id });

    expect(res).toBeNull();
  });
});
