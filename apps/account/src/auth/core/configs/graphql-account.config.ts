import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

export const accountGraphqlConfig = (): ApolloFederationDriverConfig => ({
  driver: ApolloFederationDriver,
  autoSchemaFile: {
    federation: 2,
  },
});
