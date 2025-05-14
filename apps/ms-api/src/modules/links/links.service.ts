import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

import { Link } from '@shortify/core'
import { buildLink, DateUtils, formatUrlString, getRandomKey, validateUrlFormat } from '@shortify/utils'
import { env } from 'src/shared/config/env'
import { LinksRepository } from 'src/shared/module/database/repositories/links.repository'
import { ListLinkDto } from './dtos/list-link.dto'
import { NewLinkDto } from './dtos/new-link.dto'

@Injectable()
export class LinksService {
  constructor(private readonly linksRepository: LinksRepository) {}

  async create(newLinkDto: NewLinkDto): Promise<any> {
    const { url, key, domain } = newLinkDto

    const formattedUrl = formatUrlString(url)

    const isValidUrl = validateUrlFormat(formattedUrl)
    if (!isValidUrl)
      throw new BadRequestException('Invalid url format')

    const generatedKey = await this.getKey({ domain, key })

    const newLink = new Link({
      key: generatedKey,
      url: formattedUrl,
      shortLink: buildLink({ domain, key: generatedKey }),
      domain,
      expired_url: 'http://localhost:3001',
      expires_at: DateUtils.addMinutesFromNow(env.URL_TIME_EXPIRATION),
    })

    await this.linksRepository.create(newLink)

    return newLink
  }

  async getAll(): Promise<ListLinkDto[]> {
    const links = await this.linksRepository.getAll()
    return links.map((link) => {
      const isExpired = link.checkIfExpired()
      return {
        ...link.serialize(),
        expired: isExpired,
      }
    })
  }

  async getById(id: string): Promise<ListLinkDto> {
    const link = await this.linksRepository.getById(id)

    if (!link)
      throw new NotFoundException('Link not found')

    const isExpired = link.checkIfExpired()
    return {
      ...link.serialize(),
      expired: isExpired,
    }
  }

  private async getKey({ domain, key }: { domain: string, key?: string }) {
    const randomKey = key || getRandomKey()

    const checkKeyExists = await this.linksRepository.checkDomainAndKeyExists({
      domain,
      key: randomKey,
    })

    if (!checkKeyExists) {
      return randomKey
    }

    return this.getKey({ domain })
  }
}
