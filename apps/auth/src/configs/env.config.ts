import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import * as path from 'node:path';

export const envSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string(),
  SALT: z.coerce.number(),
});

export const authEnvConfig = (): ConfigModuleOptions => ({
  validate: (env) => envSchema.parse(env),
  isGlobal: true,
  envFilePath: path.join(__dirname, '..', '..', '..', 'envs', '.auth.env'),
});

export type Env = z.infer<typeof envSchema>;
