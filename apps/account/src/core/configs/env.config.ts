import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import * as path from 'node:path';

export const envSchema = z.object({
  HTTP_PORT: z.string(),
  KAFKA_BROKER: z.string(),

  JWT_ACCESS_SECRET: z.string(),
  JWT_ACCESS_EXPIRES: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRES: z.string(),
});

export const accountEnvConfig = (): ConfigModuleOptions => ({
  isGlobal: true,
  validate: (env) => envSchema.parse(env),
  envFilePath: [
    path.join(process.cwd(), 'envs', '.account.env'),
    path.join(process.cwd(), 'envs', '.jwt.env'),
  ],
});

export type AccountEnv = z.infer<typeof envSchema>;
