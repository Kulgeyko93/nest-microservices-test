import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationEnvConfig } from './core/configs/env.config';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [ConfigModule.forRoot(NotificationEnvConfig()), GatewayModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
