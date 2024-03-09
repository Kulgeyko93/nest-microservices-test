import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';

export const envSchema = z.object({
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string(),
});

export const getValidatedConfig = (config: Record<string, unknown>) => {
  const validatedConfig = envSchema.parse(config);
  return validatedConfig;
};

export const envConfig = (): ConfigModuleOptions => ({
  validate: (env) => envSchema.parse(env),
});

export type Env = z.infer<typeof envSchema>;
