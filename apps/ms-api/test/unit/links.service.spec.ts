import type { TestingModule } from '@nestjs/testing'
import type { MockProxy } from 'jest-mock-extended'
import type { NewLinkDto } from '../../src/modules/links/dtos/new-link.dto'

import { Test } from '@nestjs/testing'
import { DateUtils } from '@shortify/utils'
import { mock } from 'jest-mock-extended'
import { LinksService } from '../../src/modules/links/links.service'
import { LinksRepository } from '../../src/shared/module/database/repositories/links.repository'

describe('linksService.create', () => {
  let service: LinksService
  let repo: MockProxy<LinksRepository>

  beforeEach(async () => {
    repo = mock<LinksRepository>()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        { provide: LinksRepository, useValue: repo },
      ],
    }).compile()

    service = module.get<LinksService>(LinksService)

    jest.spyOn(DateUtils, 'addMinutesFromNow').mockReturnValue(new Date('2025-01-01T00:00:00Z'))
  })

  afterEach(() => jest.resetAllMocks())

  it('should create and return a Link when valid DTO provided', async () => {
    const dto: NewLinkDto = { url: 'www.test.com', key: 'key123', domain: 'd.com' }
    const formatted = 'https://www.test.com/'

    const result = await service.create(dto)

    expect(result.url).toBe(formatted)
    expect(result.key).toBe('key123')
    expect(result.shortLink).toBe('http://d.com/key123')
    expect(result.expires_at.toISOString()).toBe('2025-01-01T00:00:00.000Z')
  })
})
