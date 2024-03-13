import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule } from '@nestjs/config';
import { paymentEnvConfig } from './configs/env.config';
import { LoggerModule } from '@app/common';

@Module({
  imports: [ConfigModule.forRoot(paymentEnvConfig()), LoggerModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
