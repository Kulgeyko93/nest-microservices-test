import { AuthMiddleware } from '@lib/common';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CreatePostStep } from './sagas/publish-post/create-post.step';
import { UploadPostFiles } from './sagas/publish-post/upload-files.step';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 0,
    }),
  ],
  controllers: [UploadController],
  providers: [UploadPostFiles, CreatePostStep],
})
export class UploadModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
