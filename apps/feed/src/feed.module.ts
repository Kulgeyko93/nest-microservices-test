import { TcpAuthMiddleware } from '@lib/common';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleConfig } from './core/configs/client-module.config';
import { feedEnvConfig } from './core/configs/env.config';
import { MinioStorageModule } from './modules/minio/minio.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(feedEnvConfig()),
    ClientsModule.registerAsync(clientModuleConfig()),
    MinioStorageModule,
    UploadModule,
  ],
})
export class FeedModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // consumer.apply(TcpAuthMiddleware).forRoutes('*');
  }
}
