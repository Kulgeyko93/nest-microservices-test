import { ConfigService } from '@nestjs/config';
import { ClientsModuleAsyncOptions } from '@nestjs/microservices';
import { MicroservicesNames } from '@lib/common';

export const clientModuleConfig = (): ClientsModuleAsyncOptions => [
  {
    name: MicroservicesNames.ACCOUNT_MS,
    useFactory: (configService: ConfigService) => ({
      options: {
        host: configService.get('ACCOUNT_HOST'),
        port: +configService.get('ACCOUNT_PORT'),
      },
    }),
    inject: [ConfigService],
  },
];
