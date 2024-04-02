import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { gatewayEnvConfig } from './core/configs/env.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleConfig } from './core/configs/client-module.config';
import { apolloGatewayDriverConfig } from '../../account/core/configs/apollo-gateway-driver.config';
@Module({
  imports: [
    ConfigModule.forRoot(gatewayEnvConfig()),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>(
      apolloGatewayDriverConfig(),
    ),
    ClientsModule.registerAsync(clientModuleConfig()),
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
