import { Module } from '@nestjs/common'

import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'

import { RedirectModule } from './modules/redirect/redirect.module'
import { DatabaseModule } from './shared/module/database/database.module'

@Module({
  imports: [DatabaseModule, RedirectModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
