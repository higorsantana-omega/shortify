/* eslint-disable node/prefer-global/process */

import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DATABASE_TAG: z.string().min(1, 'DATABASE_TAG is required').default('DB_SHORTIFY'),
  DATABASE_NAME: z.string().min(1, 'DATABASE_NAME is required').default('DB_SHORTIFY_DEV'),

  APP_PORT: z.number().default(3000),

  URL_TIME_EXPIRATION: z.number().default(15),
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
