import { ConfigService } from '@nestjs/config';
import { ClientsModuleAsyncOptions } from '@nestjs/microservices';
import { AUTH_SERVICE, PAYMENTS_SERVICE } from '@app/common';

export const clientModuleConfig = (): ClientsModuleAsyncOptions => [
  {
    name: AUTH_SERVICE,
    useFactory: (configService: ConfigService) => ({
      options: {
        host: configService.get('AUTH_HOST'),
        port: configService.get('AUTH_PORT'),
      },
    }),
    inject: [ConfigService],
  },
  {
    name: PAYMENTS_SERVICE,
    useFactory: (configService: ConfigService) => ({
      options: {
        host: configService.get('PAYMENTS_HOST'),
        port: configService.get('PAYMENTS_PORT'),
      },
    }),
    inject: [ConfigService],
  },
];
