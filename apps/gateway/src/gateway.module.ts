import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { gatewayEnvConfig } from './core/configs/env.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { apolloGatewayDriverConfig } from './core/configs/apollo-gateway-driver.config';

@Module({
  imports: [
    ConfigModule.forRoot(gatewayEnvConfig()),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>(
      apolloGatewayDriverConfig(),
    ),
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
