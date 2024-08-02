import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

import { accountEnvConfig } from './core/configs/env.config';
import { accountGraphqlConfig } from './core/configs/graphql-account.config';

@Module({
  imports: [
    ConfigModule.forRoot(accountEnvConfig()),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(accountGraphqlConfig()),
    AuthModule,
    PostModule,
    UserModule,
  ],
})
export class AccountModule {}
