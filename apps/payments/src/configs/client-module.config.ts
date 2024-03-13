import { ConfigService } from '@nestjs/config';
import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { NOTIFICATIONS_SERVICE } from '@app/common';

export const clientModuleConfig = (): ClientsModuleAsyncOptions => [
  {
    name: NOTIFICATIONS_SERVICE,
    useFactory: (configService: ConfigService) => ({
      transport: Transport.TCP,
      options: {
        host: configService.get('NOTIFICATIONS_HOST'),
        port: +configService.get('NOTIFICATIONS_PORT'),
      },
    }),
    inject: [ConfigService],
  },
];
