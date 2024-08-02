import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ServicesGatewayPaths } from '@lib/common';

export const postGraphqlConfig = (): ApolloFederationDriverConfig => ({
  driver: ApolloFederationDriver,
  autoSchemaFile: {
    federation: 2,
  },
  path: ServicesGatewayPaths.POST_SERVICE,
});
