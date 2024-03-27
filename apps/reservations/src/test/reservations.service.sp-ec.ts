import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from '../../src/reservations.service';
import { ReservationsRepository } from '../../src/reservations.repository';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { TCreateReservation } from '../dto/create-reservation.dto';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { reservationDbResultStub } from './stubs/reservations.stub';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let reservationsRepository: ReservationsRepository;
  let paymentService: ClientProxy;

  const mockReservationsRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
  };

  const mockPaymentService = {
    send: jest.fn().mockImplementation(() =>
      of({
        id: 'invoice123',
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: ReservationsRepository,
          useValue: mockReservationsRepository,
        },
        {
          provide: PAYMENTS_SERVICE,
          useValue: mockPaymentService,
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    reservationsRepository = module.get<ReservationsRepository>(ReservationsRepository);
    paymentService = module.get<ClientProxy>(PAYMENTS_SERVICE);
  });

  it('create is working', async () => {
    const userDto: UserDto = {
      _id: 'user123',
      email: 'test@example.com',
      password: '123',
    };
    const createReservationDto: TCreateReservation = {
      charge: {
        amount: 6,
        card: {
          cvc: '567',
          exp_month: 12,
          exp_year: 2034,
          number: '4242 4242 4242 4242',
        },
      },
      startDate: new Date('12-23-2023'),
      endDate: new Date('12-25-2023'),
      placeId: '',
    };

    const expectedReservation = {
      ...createReservationDto,
      invoiceId: 'invoice123',
      timestamp: expect.any(Date),
      userId: userDto._id,
    };

    mockReservationsRepository.create.mockImplementation(() => expectedReservation);

    const result$ = service.create(userDto, createReservationDto);

    // Subscribe to the observable to assert the results
    const result = await new Promise(async (resolve) => {
      (await result$).subscribe(resolve);
    });

    expect(paymentService.send).toHaveBeenCalledWith('create_charge', {
      ...createReservationDto.charge,
      email: userDto.email,
    });
    expect(reservationsRepository.create).toHaveBeenCalledWith(expectedReservation);
    expect(result).toEqual(expectedReservation);
  });

  it('findAll is working', async () => {
    const mockResult = reservationDbResultStub();
    mockReservationsRepository.find.mockImplementation(() => [mockResult]);

    const result = await service.findAll();

    expect(result[0]).toEqual(mockResult);
  });

  it('findOne is working', async () => {
    const mockResult = reservationDbResultStub();
    mockReservationsRepository.findOne.mockImplementation(() => mockResult);

    const result = await service.findOne(mockResult._id);

    expect(result).toEqual(mockResult);
  });

  it('update is working', async () => {
    const mockResult = reservationDbResultStub();
    mockReservationsRepository.findOneAndUpdate.mockImplementation(() => mockResult);

    const result = await service.update(mockResult._id, { placeId: '2' });

    expect(result).toEqual(mockResult);
  });

  it('remove is working', async () => {
    const mockResult = reservationDbResultStub();
    mockReservationsRepository.findOneAndDelete.mockImplementation(() => mockResult);

    const result = await service.remove(mockResult._id);

    expect(result).toEqual(mockResult);
  });
});
