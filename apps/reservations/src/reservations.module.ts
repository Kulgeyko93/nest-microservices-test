import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument, ReservationSchema } from './models/reservations.schema';
import { ConfigModule } from '@nestjs/config';
import { reservationEnvConfig } from './configs/env.config';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleConfig } from './configs/client-module.config';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: ReservationDocument.name,
        schema: ReservationSchema,
      },
    ]),
    LoggerModule,
    ConfigModule.forRoot(reservationEnvConfig()),
    ClientsModule.registerAsync(clientModuleConfig()),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
