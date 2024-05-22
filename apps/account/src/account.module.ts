import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { accountEnvConfig } from './auth/core/configs/env.config';
import { UserModule } from './user/user.module';
import { accountGraphqlConfig } from './auth/core/configs/graphql-account.config';

@Module({
  imports: [
    ConfigModule.forRoot(accountEnvConfig()),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(accountGraphqlConfig()),
    UserModule,
    AuthModule,
  ],
})
export class AccountModule {}
