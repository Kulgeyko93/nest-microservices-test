import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import {
  KafkaClients,
  KafkaConsumerGroups,
  KafkaMicroserviceNames,
} from '@lib/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getRegisteredMicroservices = (): ClientsModuleAsyncOptions => {
  return {
    isGlobal: true,
    clients: [
      {
        name: KafkaMicroserviceNames.NotificationMS,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: KafkaClients.NotificationClient,
              brokers: [configService.getOrThrow('KAFKA_BROKER')],
            },
            consumer: {
              groupId: KafkaConsumerGroups.NotificationConsumer,
            },
          },
        }),
        inject: [ConfigService],
      },
      {
        name: KafkaMicroserviceNames.AccountMS,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: KafkaClients.AccountClient,
              brokers: [configService.getOrThrow('KAFKA_BROKER')],
            },
            consumer: {
              groupId: KafkaConsumerGroups.AccountConsumer,
            },
          },
        }),
        inject: [ConfigService],
      },
    ],
  };
};
