import { Inject, Injectable, Logger } from '@nestjs/common'
import { Link, LinkData } from '@shortify/core'
import { DateUtils } from '@shortify/utils'
import { eq } from 'drizzle-orm'
import { MySql2Database } from 'drizzle-orm/mysql2'
import { env } from 'src/shared/config/env'
import { CacheProvider } from '../../providers/cache/cache.provider'
import * as schema from '../drizzle/schema'

@Injectable()
export class LinksRepository {
  private readonly logger = new Logger(LinksRepository.name)
  private readonly model = schema.links

  private readonly DEFAULT_CACHE_TTL = 3600 // 1 hour
  private readonly CACHE_KEY_PREFIX = 'link:key:'

  constructor(
    @Inject(env.DATABASE_TAG) private drizzle: MySql2Database<typeof schema>,
    private readonly cacheProvider: CacheProvider,
  ) {}

  async getByKey(key: string): Promise<Link | null> {
    const cacheKey = this.CACHE_KEY_PREFIX + key

    const cachedLink = await this.cacheProvider.get<LinkData>(cacheKey)
    if (cachedLink) {
      this.logger.log(`Cache HIT for key: ${key}`)
      return Link.createFrom(cachedLink as unknown as LinkData)
    }

    this.logger.log(`Cache MISS for key: ${key}, fetching from database`)

    const [link] = await this.drizzle
      .select()
      .from(this.model)
      .where(eq(this.model.key, key))
      .limit(1)

    if (!link) {
      this.logger.log(`Link with key: ${key} not found in database`)
      return null
    }

    this.logger.debug(`Link with key: ${key} found in database`)

    const linkEntity = Link.createFrom({
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

    let cacheTTL = this.DEFAULT_CACHE_TTL

    if (linkEntity.getExpiresAt()) {
      const secondsUntilExpiry = DateUtils.secondsUntil(linkEntity.getExpiresAt() as Date)
      cacheTTL = secondsUntilExpiry > 0
        ? secondsUntilExpiry
        : 60 // 1 minute

      this.logger.debug(`Link expires in ${secondsUntilExpiry} seconds, setting TTL accordingly`)
    }

    if (!linkEntity.getExpiresAt()) {
      this.logger.debug(`Link has no expiration date, using default TTL of ${cacheTTL} seconds`)
    }

    this.logger.debug(`Caching link with key: ${key} for ${cacheTTL} seconds`)
    await this.cacheProvider.set(cacheKey, linkEntity.serialize(), cacheTTL)

    return linkEntity
  }
}
