import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ServicesGatewayPaths } from '@lib/common';

export const accountGraphqlConfig = (): ApolloFederationDriverConfig => ({
  driver: ApolloFederationDriver,
  autoSchemaFile: {
    federation: 2,
  },
  path: ServicesGatewayPaths.ACCOUNT_SERVICE,
});
