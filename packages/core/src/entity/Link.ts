import { v4 as uuid } from 'uuid'

export interface LinkData {
  id?: string
  key: string
  url: string
  shortLink: string
  expired_url: string
  domain: string
  expires_at?: Date
  created_at?: Date
  updated_at?: Date
}

export class Link {
  private readonly id: string
  private readonly key: string
  private readonly url: string
  private readonly shortLink: string
  private readonly expired_url: string
  private readonly domain: string
  private readonly expires_at?: Date
  private readonly created_at?: Date
  private readonly updated_at?: Date

  constructor({
    id,
    key,
    url,
    shortLink,
    expired_url,
    domain,
    expires_at,
    created_at,
    updated_at,
  }: LinkData) {
    this.id = id || uuid()
    this.key = key
    this.url = url
    this.shortLink = shortLink
    this.expired_url = expired_url
    this.domain = domain
    this.expires_at = expires_at
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }

  getId() {
    return this.id
  }

  getKey(): string {
    return this.key
  }

  getUrl(): string {
    return this.url
  }

  getShortLink(): string {
    return this.shortLink
  }

  getExpiredUrl(): string {
    return this.expired_url
  }

  getDomain(): string {
    return this.domain
  }

  getExpiresAt() {
    return this.expires_at
  }

  getCreatedAt() {
    return this.created_at
  }

  getUpdatedAt() {
    return this.updated_at
  }

  static createFrom(data: LinkData): Link {
    return new Link(data)
  }

  serialize() {
    return {
      id: this.id,
      key: this.key,
      url: this.url,
      shortLink: this.shortLink,
      expired_url: this.expired_url,
      domain: this.domain,
      expires_at: this.expires_at,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }
}
