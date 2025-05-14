import { Inject, Injectable } from '@nestjs/common'
import { Link } from '@shortify/core'
import { eq } from 'drizzle-orm'
import { MySql2Database } from 'drizzle-orm/mysql2'
import { env } from 'src/shared/config/env'
import * as schema from '../drizzle/schema'

@Injectable()
export class LinksRepository {
  private readonly model = schema.links

  constructor(
    @Inject(env.DATABASE_TAG) private drizzle: MySql2Database<typeof schema>,
  ) {}

  async getByKey(key: string): Promise<Link | null> {
    const [link] = await this.drizzle
      .select()
      .from(this.model)
      .where(eq(this.model.key, key))
      .limit(1)

    if (!link)
      return null

    return Link.createFrom({
      id: link.id,
      key: link.key,
      domain: link.domain,
      url: link.url,
      shortLink: link.shortLink,
      expired_url: link.expired_url,
      expires_at: link.expires_at as Date,
      created_at: link.created_at as Date,
      updated_at: link.updated_at as Date,
    })
  }
}
