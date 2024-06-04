import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import {
  KafkaClients,
  KafkaConsumerGroups,
  KafkaMicroserviceNames,
} from '../contracts';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const clientModuleConfigs: Record<
  KafkaMicroserviceNames,
  ClientsProviderAsyncOptions
> = {
  [KafkaMicroserviceNames.AccountMS]: {
    name: KafkaMicroserviceNames.AccountMS,
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: KafkaClients.AccountClient,
          brokers: ['localhost:9092'],
          // brokers: [configService.getOrThrow('KAFKA_BROKER')],
        },
        consumer: {
          groupId: KafkaConsumerGroups.AccountConsumer,
        },
        producer: {
          allowAutoTopicCreation: true,
        },
      },
    }),
    inject: [ConfigService],
  },
  [KafkaMicroserviceNames.NotificationMS]: {
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
  [KafkaMicroserviceNames.FeedMS]: {
    name: KafkaMicroserviceNames.FeedMS,
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: KafkaClients.FeedClient,
          brokers: [configService.getOrThrow('KAFKA_BROKER')],
        },
        consumer: {
          groupId: KafkaConsumerGroups.FeedConsumer,
        },
      },
    }),
    inject: [ConfigService],
  },
};
