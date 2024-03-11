import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  providers: [],
  exports: [],
  imports: [DatabaseModule, LoggerModule],
})
export class CommonModule {}
