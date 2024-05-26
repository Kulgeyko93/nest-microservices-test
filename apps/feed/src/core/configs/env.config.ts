import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import * as path from 'node:path';

export const envSchema = z.object({
  HTTP_PORT: z.string(),
  ACCOUNT_HOST: z.string(),
  ACCOUNT_PORT: z.string(),

  MINIO_ROOT_USER: z.string(),
  MINIO_ROOT_PASSWORD: z.string(),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_ACCESS_SECRET: z.string(),
});

export const feedEnvConfig = (): ConfigModuleOptions => ({
  isGlobal: true,
  validate: (env) => envSchema.parse(env),
  envFilePath: path.join(process.cwd(), 'envs', '.feed.env'),
});

export type FeedEnv = z.infer<typeof envSchema>;
