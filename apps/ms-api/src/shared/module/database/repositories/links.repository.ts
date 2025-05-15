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
    @Inject(env.DATABASE_TAG) private drizzle: MySql2Database<typeof schema>,
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
    await this.drizzle.insert(this.model).values(values)
  }

  async getAll(): Promise<Link[]> {
    const links = await this.drizzle.select().from(this.model)
    return links.map(link => Link.createFrom({
      id: link.id,
      key: link.key,
      domain: link.domain,
      url: link.url,
      shortLink: link.shortLink,
      expired_url: link.expired_url,
      expires_at: link.expires_at as Date,
      created_at: link.created_at as Date,
      updated_at: link.updated_at as Date,
    }))
  }

  async getById(id: string): Promise<Link | null> {
    const [link] = await this.drizzle
      .select()
      .from(this.model)
      .where(eq(this.model.id, id))
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

  async checkDomainAndKeyExists({ domain, key }: { domain: string, key: string }) {
    const result = await this.drizzle
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

  async getAccessesPerDayGroupedByKey(): Promise<
    { shortlinkKey: string, accessedDate: string, count: number }[]
  > {
    const result = await this.drizzle.execute(
      `SELECT
        shortlink_key AS shortlinkKey,
        DATE(accessed_at) AS accessedDate,
        COUNT(*) AS count
     FROM link_access_logs
     GROUP BY shortlink_key, DATE(accessed_at)
     ORDER BY accessedDate ASC, count DESC`,
    )

    return result as any
  }

  async getMostActivePeriod(): Promise<{ date: string, count: number } | null> {
    const result = await this.drizzle.execute(
      `SELECT
          DATE(accessed_at) AS date,
          COUNT(*) AS count
       FROM link_access_logs
       GROUP BY DATE(accessed_at)
       ORDER BY count DESC
       LIMIT 1`,
    )

    return (result[0] as any) || null
  }
}
