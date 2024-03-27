import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from '../reservations.controller';
import { ReservationsService } from '../reservations.service';
import { reservationDbResultStub } from './stubs/reservations.stub';
import { AUTH_SERVICE, JwtAuthGuard, UserDto } from '@app/common';
import { TCreateReservation } from '../dto/create-reservation.dto';
import { ClientProxy } from '@nestjs/microservices';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let authClient: ClientProxy;
  let guard: JwtAuthGuard;

  const mockResult = reservationDbResultStub();
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

  const mockReservationsService = {
    create: () => jest.fn(),
    findOne: () => jest.fn(),
    update: () => jest.fn(),
    remove: () => jest.fn(),
  };

  const mockAuthRepository = jest.fn().mockImplementation(() => {
    return {
      canActivate: jest.fn().mockResolvedValue(() => {
        return true;
      }),
    };
  });

  beforeEach(async () => {
    guard = new JwtAuthGuard(authClient);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ReservationsService, useValue: mockReservationsService },
        {
          provide: AUTH_SERVICE,
          useValue: mockAuthRepository,
        },
      ],
      controllers: [ReservationsController],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('findOne is working', async () => {
    mockReservationsService.create().mockImplementation(() => mockResult);
    mockAuthRepository.mockResolvedValue(() => true);
    const result = await controller.create(createReservationDto, userDto);

    expect(result).toEqual(mockResult);
  });
});
