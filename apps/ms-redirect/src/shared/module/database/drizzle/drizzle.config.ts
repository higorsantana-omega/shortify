import { defineConfig } from 'drizzle-kit'

import { env } from 'src/shared/config/env'

export default defineConfig({
  dialect: 'mysql',
  schema: './src/shared/module/database/drizzle/schema.ts',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
