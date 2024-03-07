import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDbConfig } from '../app-configs/mongodb.config';

@Module({
  imports: [MongooseModule.forRootAsync(mongoDbConfig())],
})
export class DatabaseModule {}
