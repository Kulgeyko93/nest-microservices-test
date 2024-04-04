import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import * as path from 'node:path';

export const envSchema = z.object({
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_LOGGING: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true'),
  POSTGRES_SYNCHRONIZE: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true'),
});

export const commonEnvConfig = (): ConfigModuleOptions => ({
  isGlobal: true,
  validate: (env) => envSchema.parse(env),
  envFilePath: path.join(process.cwd(), 'envs', '.common.env'),
});

export type CommonEnv = z.infer<typeof envSchema>;
