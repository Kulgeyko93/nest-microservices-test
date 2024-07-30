import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { feedEnvConfig } from './core/configs/env.config';
import { MinioStorageModule } from './modules/minio/minio.module';
import { UploadModule } from './modules/upload/upload.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import { feedGraphqlConfig } from './core/configs/graphql-feed.config';

@Module({
  imports: [
    ConfigModule.forRoot(feedEnvConfig()),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(feedGraphqlConfig()),
    MinioStorageModule,
    UploadModule,
  ],
})
export class FeedModule {}
