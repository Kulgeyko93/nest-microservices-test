import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { feedEnvConfig } from './core/configs/env.config';
import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import { feedGraphqlConfig } from './core/configs/graphql-account.config';

@Module({
  imports: [
    ConfigModule.forRoot(feedEnvConfig()),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(feedGraphqlConfig()),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
