import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { postEnvConfig } from './core/configs/env.config';
import { postGraphqlConfig } from './core/configs/graphql-post.config';
import { PostModule } from './modules/post/post.module';
import { AuthCommonModule } from '@lib/common/auth-common';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '@lib/common';

@Module({
  imports: [
    ConfigModule.forRoot(postEnvConfig()),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(postGraphqlConfig()),
    AuthCommonModule,
    JwtModule.register(getJWTConfig()),
    PostModule,
  ],
})
export class PostServiceModule {}
