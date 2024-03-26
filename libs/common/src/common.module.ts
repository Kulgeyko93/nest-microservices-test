import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDbConfig } from './app-configs/mongodb.config';

@Module({
  providers: [],
  exports: [],
  imports: [DatabaseModule, LoggerModule, MongooseModule.forRootAsync(mongoDbConfig())],
})
export class CommonModule {}
