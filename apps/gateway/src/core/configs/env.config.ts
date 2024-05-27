import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import * as path from 'node:path';

export const envSchema = z.object({
  PORT: z.string(),
  X_API_KEY: z.string(),

  ACCOUNT_GRAPHQL_URL: z.string(),

  ACCOUNT_HOST: z.string(),
  ACCOUNT_PORT: z.string(),

  NOTIFICATION_BROKER: z.string(),
});

export const gatewayEnvConfig = (): ConfigModuleOptions => ({
  isGlobal: true,
  validate: (env) => envSchema.parse(env),
  envFilePath: path.join(process.cwd(), 'envs', '.gateway.env'),
});

export type AccountEnv = z.infer<typeof envSchema>;
