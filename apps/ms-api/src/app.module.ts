import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis'

import { Module } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'

import { seconds, ThrottlerModule } from '@nestjs/throttler'
import { Redis } from 'ioredis'
import { ZodValidationPipe } from 'nestjs-zod'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LinksModule } from './modules/links/links.module'
import { env } from './shared/config/env'
import { DatabaseModule } from './shared/module/database/database.module'

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: seconds(60),
          limit: 15,
        },
      ],
      storage: new ThrottlerStorageRedisService(

        new Redis({
          host: env.REDIS_HOST,
          port: env.REDIS_PORT,
        }),
      ),
    }),
    DatabaseModule,
    LinksModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    AppService,
  ],
})
export class AppModule {}
