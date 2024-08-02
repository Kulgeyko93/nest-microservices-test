import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { authContext } from '../../auth.context';
import { ServicesGatewayPaths } from '@lib/common';

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
            name: 'account',
            url:
              configService.get<string>('ACCOUNT_GRAPHQL_URL') +
              `/${ServicesGatewayPaths.ACCOUNT_SERVICE}`,
          },
          {
            name: 'feed',
            url:
              configService.get<string>('FEED_GRAPHQL_URL') +
              `/${ServicesGatewayPaths.FEED_SERVICE}`,
          },
          {
            name: 'post',
            url:
              configService.get<string>('POST_GRAPHQL_URL') +
              `/${ServicesGatewayPaths.POST_SERVICE}`,
          },
        ],
      }),
      buildService({ url }) {
        return new RemoteGraphQLDataSource({
          url,
          willSendRequest({ request, context }) {
            request.http?.headers.set(
              'user',
              context?.user ? JSON.stringify(context.user) : '',
            );
            request.http?.headers.set(
              'authorization',
              context?.headers?.authorization
                ? context?.headers?.authorization
                : '',
            );
          },
        });
      },
    },
  };
};
