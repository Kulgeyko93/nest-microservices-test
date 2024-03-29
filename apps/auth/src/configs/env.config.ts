import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import * as path from 'node:path';

export const envSchema = z.object({
  HTTP_PORT: z.coerce.number(),
  TSP_PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string(),
  SALT: z.coerce.number(),
});

export const authEnvConfig = (): ConfigModuleOptions => ({
  validate: (env) => envSchema.parse(env),
  isGlobal: true,
  envFilePath: path.join(process.cwd(), 'envs', '.auth.env'),
});

export type Env = z.infer<typeof envSchema>;
