import { z } from 'zod';
import { ConfigError } from './errors.js';

const teamDomain = z
  .string()
  .min(1)
  .refine((v) => !/^https?:\/\//i.test(v), 'must not include a scheme')
  .refine((v) => !v.endsWith('/'), 'must not end with a slash');

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  CF_ACCESS_TEAM_DOMAIN: teamDomain,
  CF_ACCESS_AUD_WORKSPACE: z.string().min(1),
  CF_ACCESS_AUD_PETTY_CASH: z.string().min(1),
  CF_ACCESS_AUD_RIDER_PAYMENTS: z.string().min(1),
  IAM_DATABASE_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const [first] = parsed.error.issues;
    const key = first?.path.join('.') ?? '<unknown>';
    const reason = first?.message ?? 'invalid value';
    throw new ConfigError(`Invalid environment: ${key} — ${reason}`);
  }
  return Object.freeze(parsed.data);
}

export const env: Env = parseEnv();
