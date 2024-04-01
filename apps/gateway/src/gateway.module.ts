import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { gatewayEnvConfig } from './core/configs/env.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: (configService: ConfigService) => ({
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'accounts',
                url: configService.getOrThrow<string>('ACCOUNT_GRAPHQL_URL'),
              },
            ],
          }),
        },
      }),
    }),
    ConfigModule.forFeature(gatewayEnvConfig),
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
