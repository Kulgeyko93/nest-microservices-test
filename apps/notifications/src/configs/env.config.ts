import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import * as path from 'node:path';

export const envSchema = z.object({
  TCP_PORT: z.coerce.number(),
  SMTP_USER: z.string(),
  GOOGLE_OAUTH_CLIENT_ID: z.string(),
  GOOGLE_OAUTH_CLIENT_SECRET: z.string(),
  GOOGLE_OAUTH_CLIENT_TOKEN: z.string(),
});

export const paymentEnvConfig = (): ConfigModuleOptions => ({
  validate: (env) => envSchema.parse(env),
  isGlobal: true,
  envFilePath: path.join(process.cwd(), 'envs', '.notification.env'),
});

export type Env = z.infer<typeof envSchema>;
