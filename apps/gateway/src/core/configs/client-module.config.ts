import { ConfigService } from '@nestjs/config';
import { ClientsModuleAsyncOptions } from '@nestjs/microservices';
import { ACCOUNT_SERVICE } from '@lib/common';

export const clientModuleConfig = (): ClientsModuleAsyncOptions => [
  {
    name: ACCOUNT_SERVICE,
    useFactory: (configService: ConfigService) => ({
      options: {
        host: configService.get('ACCOUNT_HOST'),
        port: configService.get('ACCOUNT_PORT'),
      },
    }),
    inject: [ConfigService],
  },
];
