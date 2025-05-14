import { Injectable, NotFoundException } from '@nestjs/common'
import { env } from 'src/shared/config/env'
import { LinksRepository } from 'src/shared/module/database/repositories/links.repository'

@Injectable()
export class RedirectService {
  constructor(private readonly linksRepository: LinksRepository) {}

  async getUrlByKey(key: string): Promise<string> {
    const link = await this.linksRepository.getByKey(key)

    if (!link)
      return env.NOT_FOUND_PAGE

    const isExpired = link.checkIfExpired()
    if (isExpired)
      return link.getExpiredUrl()

    return link.getUrl()
  }
}
