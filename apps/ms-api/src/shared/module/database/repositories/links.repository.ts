import { Inject, Injectable } from '@nestjs/common'
import { MySql2Database } from 'drizzle-orm/mysql2'
import { env } from 'src/shared/config/env'
import * as schema from '../drizzle/schema'

@Injectable()
export class LinksRepository {
  private readonly model = schema.links

  constructor(
    @Inject(env.DATABASE_TAG) private dizzle: MySql2Database<typeof schema>,
  ) {}

  async getAll() {
    return this.dizzle.select().from(this.model)
  }
}
