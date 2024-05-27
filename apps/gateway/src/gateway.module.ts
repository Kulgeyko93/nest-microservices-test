import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { gatewayEnvConfig } from './core/configs/env.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { apolloGatewayDriverConfig } from './core/configs/apollo-gateway-driver.config';
import { ClientsModule } from '@nestjs/microservices';
import { getRegisteredMicroservices } from './core/configs/kafka-microservices.config';

@Module({
  imports: [
    ConfigModule.forRoot(gatewayEnvConfig()),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>(
      apolloGatewayDriverConfig(),
    ),
    ClientsModule.registerAsync(getRegisteredMicroservices()),
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
