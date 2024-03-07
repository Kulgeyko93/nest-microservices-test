import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { mongoDbConfig } from '../app-configs/mongodb.config';

@Module({
  imports: [MongooseModule.forRootAsync(mongoDbConfig())],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
