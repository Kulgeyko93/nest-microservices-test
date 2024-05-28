import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { KafkaConsumerGroups, KafkaMicroserviceNames } from '@lib/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getRegisteredMicroservices = (): ClientsModuleAsyncOptions => {
  return [
    {
      name: KafkaMicroserviceNames.NotificationMS,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'notification',
            brokers: [configService.getOrThrow('NOTIFICATION_BROKER')],
          },
          consumer: {
            groupId: KafkaConsumerGroups.NotificationConsumer,
          },
        },
      }),
      inject: [ConfigService],
    },
  ];
};
