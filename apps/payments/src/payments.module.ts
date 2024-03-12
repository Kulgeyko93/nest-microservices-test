import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule } from '@nestjs/config';
import { paymentEnvConfig } from './configs/env.config';

@Module({
  imports: [ConfigModule.forRoot(paymentEnvConfig())],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
