import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigModule } from '../config';
import { EnvService } from '../config/env.service';

export const mongoDbConfig = (): MongooseModuleAsyncOptions => ({
  imports: [ConfigModule],
  useFactory: (configService: EnvService) => ({
    uri: configService.get('MONGODB_URI'),
  }),
  inject: [EnvService],
});
