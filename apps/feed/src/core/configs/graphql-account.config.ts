import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ServicesGatewayPaths } from '@lib/common';

export const feedGraphqlConfig = (): ApolloFederationDriverConfig => ({
  driver: ApolloFederationDriver,
  autoSchemaFile: {
    federation: 2,
  },
  path: ServicesGatewayPaths.FEED_SERVICE,
});
