import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { feedEnvConfig } from './core/configs/env.config';
import { feedGraphqlConfig } from './core/configs/graphql-account.config';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(feedEnvConfig()),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(feedGraphqlConfig()),
    UploadModule,
  ],
})
export class FeedModule {}
