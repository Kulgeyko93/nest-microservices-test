import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import * as path from 'node:path';

export const envSchema = z.object({
  PORT: z.string(),
});

export const commonEnvConfig = (): ConfigModuleOptions => ({
  isGlobal: true,
  validate: (env) => envSchema.parse(env),
  envFilePath: path.join(process.cwd(), 'envs', '.account.env'),
});

export type Env = z.infer<typeof envSchema>;
