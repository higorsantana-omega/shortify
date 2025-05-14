/* eslint-disable perfectionist/sort-imports */
import 'dotenv/config'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

import { env } from './shared/config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await app.listen(env.APP_PORT)
}

void bootstrap()
