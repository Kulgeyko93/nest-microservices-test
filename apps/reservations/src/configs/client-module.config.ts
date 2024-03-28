import { ConfigService } from '@nestjs/config';
import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, PAYMENTS_SERVICE } from '@app/common';

export const clientModuleConfig = (): ClientsModuleAsyncOptions => [
  {
    name: AUTH_SERVICE,
    useFactory: (configService: ConfigService) => ({
      transport: Transport.RMQ,
      options: {
        urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
        queue: 'auth',
      },
    }),
    inject: [ConfigService],
  },
  {
    name: PAYMENTS_SERVICE,
    useFactory: (configService: ConfigService) => ({
      transport: Transport.RMQ,
      options: {
        urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
        queue: 'payment',
      },
    }),
    inject: [ConfigService],
  },
];
