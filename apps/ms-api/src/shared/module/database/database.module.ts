import { Global, Module } from '@nestjs/common'

import { DrizzleMySqlModule } from '@shortify/drizzle-orm-mysql'

import { env } from 'src/shared/config/env'

import * as schema from './drizzle/schema'
import { LinksRepository } from './repositories/links.repository'

@Global()
@Module({
  imports: [
    DrizzleMySqlModule.register({
      tag: env.DATABASE_TAG,
      config: {
        logger: true,
        mode: 'default',
        schema: { ...schema },
      },
      mysql: {
        connection: 'client',
        config: {
          uri: env.DATABASE_URL,
          database: env.DATABASE_NAME,
        },
      },
    }),
  ],
  providers: [LinksRepository],
  exports: [],
})
export class DatabaseModule {}
