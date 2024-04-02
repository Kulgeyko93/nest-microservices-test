import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { authContext } from '../../../gateway/src/auth.context';
import { ConfigService } from '@nestjs/config';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';

const configService = new ConfigService();

export const apolloGatewayDriverConfig = (): ApolloGatewayDriverConfig => {
  return {
    driver: ApolloGatewayDriver,
    server: {
      context: authContext,
    },
    gateway: {
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
          {
            name: 'accounts',
            url: configService.get<string>('ACCOUNT_GRAPHQL_URL'),
          },
        ],
      }),
      buildService({ url }) {
        return new RemoteGraphQLDataSource({
          url,
          willSendRequest({ request, context }) {
            request.http?.headers.set(
              'user',
              context.user ? JSON.stringify(context.user) : '',
            );
          },
        });
      },
    },
  };
};
