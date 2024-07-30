export enum ServicesGatewayPaths {
  ACCOUNT_SERVICE = 'account/graphql',
  FEED_SERVICE = 'feed/graphql',
}

export enum MicroservicesNames {
  ACCOUNT_MS = 'account-microservice',
}

export enum KafkaMicroserviceNames {
  NotificationMS = 'notification-microservice',
  AccountMS = 'account-microservice',
  FeedMS = 'feed-microservice',
}

export enum KafkaConsumerGroups {
  NotificationConsumer = 'notification-consumer',
  AccountConsumer = 'account-consumer',
  FeedConsumer = 'feed-consumer',
}

export enum KafkaClients {
  NotificationClient = 'notification-client',
  AccountClient = 'account-client',
  GatewayClient = 'gateway-client',
  FeedClient = 'feed-client',
}
