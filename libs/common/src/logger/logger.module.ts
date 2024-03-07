import { Module } from '@nestjs/common';
import { LoggerModule as pinoLoggerModule } from 'nestjs-pino';
import { pinoLoggerConfig } from '../app-configs/pino-logger.config';

@Module({
  imports: [pinoLoggerModule.forRoot(pinoLoggerConfig())],
})
export class LoggerModule {}
