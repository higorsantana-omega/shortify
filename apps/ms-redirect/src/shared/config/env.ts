/* eslint-disable node/prefer-global/process */

import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DATABASE_TAG: z.string().min(1, 'DATABASE_TAG is required').default('DB_SHORTIFY'),
  DATABASE_NAME: z.string().min(1, 'DATABASE_NAME is required').default('DB_SHORTIFY_DEV'),

  APP_PORT: z.number().default(3001),

  REDIS_HOST: z.string().optional().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().optional().default(6379),
  REDIS_DB: z.coerce.number().optional().default(0),

  NOT_FOUND_PAGE: z.string().optional().default('http://localhost:3006'),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    JSON.stringify(parsedEnv.error.format(), null, 2),
  )
  process.exit(1)
}

export const env = parsedEnv.data
