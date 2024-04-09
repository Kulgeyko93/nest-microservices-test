import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import { redisCacheFactory } from '../core/configs/cache.config';

@Module({
  imports: [CacheModule.registerAsync<RedisClientOptions>(redisCacheFactory())],
})
export class RedisCacheModule {}
