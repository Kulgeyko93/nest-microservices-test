import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import * as path from 'node:path';

export const envSchema = z.object({
  TCP_PORT: z.coerce.number(),
  NOTIFICATIONS_HOST: z.string(),
  NOTIFICATIONS_PORT: z.coerce.number(),
  STRIPE_SECRET_KEY: z.string(),
});

export const paymentEnvConfig = (): ConfigModuleOptions => ({
  validate: (env) => envSchema.parse(env),
  isGlobal: true,
  envFilePath: path.join(__dirname, '..', '..', '..', 'envs', '.payment.env'),
});

export type Env = z.infer<typeof envSchema>;
