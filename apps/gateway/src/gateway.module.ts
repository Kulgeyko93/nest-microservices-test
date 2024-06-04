import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { gatewayEnvConfig } from './core/configs/env.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { apolloGatewayDriverConfig } from './core/configs/apollo-gateway-driver.config';
import { ClientsModule } from '@nestjs/microservices';
import { UploadModule } from './modules/upload/upload.module';
import { KafkaMicroserviceNames, clientModuleConfigs } from '@lib/common';

@Module({
  imports: [
    ConfigModule.forRoot(gatewayEnvConfig()),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>(
      apolloGatewayDriverConfig(),
    ),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [clientModuleConfigs[KafkaMicroserviceNames.AccountMS]],
    }),
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
