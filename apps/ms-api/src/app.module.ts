import { Module } from '@nestjs/common'

import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LinksModule } from './modules/links/links.module'
import { DatabaseModule } from './shared/module/database/database.module'

@Module({
  imports: [DatabaseModule, LinksModule],
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
