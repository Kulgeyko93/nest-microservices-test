import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleConfig } from './core/configs/client-module.config';
import { feedEnvConfig } from './core/configs/env.config';
import { UploadModule } from './modules/upload/upload.module';
import { TcpAuthMiddleware } from '@lib/common';

@Module({
  imports: [
    ConfigModule.forRoot(feedEnvConfig()),
    ClientsModule.registerAsync(clientModuleConfig()),
    UploadModule,
  ],
})
export class FeedModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TcpAuthMiddleware).forRoutes('*');
  }
}
