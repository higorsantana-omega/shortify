import { Inject, Injectable } from '@nestjs/common'
import { Link } from '@shortify/core'
import { and, eq, sql } from 'drizzle-orm'
import { MySql2Database } from 'drizzle-orm/mysql2'
import { env } from 'src/shared/config/env'
import * as schema from '../drizzle/schema'

@Injectable()
export class LinksRepository {
  private readonly model = schema.links

  constructor(
    @Inject(env.DATABASE_TAG) private dizzle: MySql2Database<typeof schema>,
  ) {}

  async create(link: Link) {
    const values: typeof schema.links.$inferInsert = {
      id: link.getId(),
      key: link.getKey(),
      domain: link.getDomain(),
      shortLink: link.getShortLink(),
      expired_url: link.getExpiredUrl(),
      url: link.getUrl(),
      expires_at: link.getExpiresAt(),
      created_at: link.getCreatedAt(),
      updated_at: link.getUpdatedAt(),
    }
    await this.dizzle.insert(this.model).values(values)
  }

  async getAll() {
    return this.dizzle.select().from(this.model)
  }

  async checkDomainAndKeyExists({ domain, key }: { domain: string, key: string }) {
    const result = await this.dizzle
      .select({ exists: sql`1` })
      .from(this.model)
      .where(
        and(
          eq(this.model.domain, domain),
          eq(this.model.key, key),
        ),
      )
      .limit(1)

    return result.length > 0
  }
}
