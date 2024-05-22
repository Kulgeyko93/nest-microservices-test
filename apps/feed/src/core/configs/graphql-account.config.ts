import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

export const feedGraphqlConfig = (): ApolloFederationDriverConfig => ({
  driver: ApolloFederationDriver,
  autoSchemaFile: {
    federation: 2,
  },
});
