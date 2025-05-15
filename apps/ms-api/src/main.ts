/* eslint-disable perfectionist/sort-imports */
import 'dotenv/config'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

import { env } from './shared/config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.enableVersioning()

  await app.listen(env.APP_PORT, '0.0.0.0')
}

void bootstrap()
