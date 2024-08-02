import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { postEnvConfig } from './core/configs/env.config';
import { postGraphqlConfig } from './core/configs/graphql-post.config';

@Module({
  imports: [
    ConfigModule.forRoot(postEnvConfig()),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(postGraphqlConfig()),
  ],
  controllers: [],
  providers: [],
})
export class PostModule {}
