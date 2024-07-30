import { KafkaMicroserviceNames, clientModuleConfigs } from '@lib/common';
import { ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { apolloGatewayDriverConfig } from './core/configs/apollo-gateway-driver.config';
import { gatewayEnvConfig } from './core/configs/env.config';
import { getJWTConfig } from './core/configs/jwt.config';
import { UploadModule } from './modules/upload/upload.module';
import { AuthMiddleware } from './core/middleware/auth.middleware';

@Module({
  imports: [
    JwtModule.register(getJWTConfig()),
    ConfigModule.forRoot(gatewayEnvConfig()),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>(
      apolloGatewayDriverConfig(),
    ),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        clientModuleConfigs[KafkaMicroserviceNames.AccountMS],
        clientModuleConfigs[KafkaMicroserviceNames.FeedMS],
      ],
    }),
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('upload/*');
  }
}
