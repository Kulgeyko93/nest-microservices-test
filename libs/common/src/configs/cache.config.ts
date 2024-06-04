import { redisStore } from 'cache-manager-redis-yet';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import {
  RedisClientOptions,
  RedisModules,
  RedisFunctions,
  RedisScripts,
} from 'redis';

export const redisCacheFactory = (): CacheModuleAsyncOptions<
  RedisClientOptions<RedisModules, RedisFunctions, RedisScripts>
> => ({
  imports: [ConfigModule],
  useFactory: async (cfg: ConfigService) => ({
    store: await redisStore({
      socket: {
        host: cfg.get('REDIS_HOST'),
        port: parseInt(cfg.get('REDIS_PORT ') || '6379'),
      },
      password: cfg.get('REDIS_PASSWORD'),
      ttl: cfg.get('REDIS_TTL'),
    }),
  }),
  inject: [ConfigService],
});
