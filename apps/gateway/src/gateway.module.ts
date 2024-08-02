import { ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { apolloGatewayDriverConfig } from './core/configs/apollo-gateway-driver.config';
import { gatewayEnvConfig } from './core/configs/env.config';
import { getJWTConfig } from './core/configs/jwt.config';

@Module({
  imports: [
    JwtModule.register(getJWTConfig()),
    ConfigModule.forRoot(gatewayEnvConfig()),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>(
      apolloGatewayDriverConfig(),
    ),
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
