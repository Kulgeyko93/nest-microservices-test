import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import * as path from 'node:path';

export const envSchema = z.object({
  PORT: z.coerce.number(),
  MONGODB_URI: z.string(),
  AUTH_HOST: z.string(),
  AUTH_PORT: z.coerce.number(),
  PAYMENTS_HOST: z.string(),
  PAYMENTS_PORT: z.coerce.number(),
});

export const reservationEnvConfig = (): ConfigModuleOptions => ({
  validate: (env) => envSchema.parse(env),
  isGlobal: true,
  envFilePath: path.join(process.cwd(), 'envs', '.reservation.env'),
});

export type Env = z.infer<typeof envSchema>;
