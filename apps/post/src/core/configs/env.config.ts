import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
import * as path from 'node:path';

export const envSchema = z.object({
  HTTP_PORT: z.string(),
});

export const postEnvConfig = (): ConfigModuleOptions => ({
  isGlobal: true,
  validate: (env) => envSchema.parse(env),
  envFilePath: path.join(process.cwd(), 'envs', '.post.env'),
});

export type PostEnv = z.infer<typeof envSchema>;
