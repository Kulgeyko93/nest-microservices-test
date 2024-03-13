import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { paymentEnvConfig } from './configs/env.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(paymentEnvConfig())],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
