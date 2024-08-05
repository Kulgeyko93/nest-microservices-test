import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import * as path from 'node:path';

export const envSchema = z.object({
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_LOGGING: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true'),
  POSTGRES_SYNCHRONIZE: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true'),

  POSTGRES_USER_MASTER: z.string(),
  POSTGRES_PASSWORD_MASTER: z.string(),
  POSTGRES_DB_MASTER: z.string(),

  POSTGRES_USER_SLAVE: z.string(),
  POSTGRES_PASSWORD_SLAVE: z.string(),
  POSTGRES_DB_SLAVE: z.string(),
});

export const commonEnvConfig = (): ConfigModuleOptions => ({
  isGlobal: true,
  validate: (env) => envSchema.parse(env),
  envFilePath: [
    path.join(process.cwd(), 'envs', '.common.env'),
    path.join(process.cwd(), 'envs', '.database.env'),
  ],
});

export type CommonEnv = z.infer<typeof envSchema>;
