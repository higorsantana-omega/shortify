import type { INestApplication } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'
import type { MySql2Database } from 'drizzle-orm/mysql2'
import { HttpStatus } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { env } from '../../src/shared/config/env'
import * as schema from '../../src/shared/module/database/drizzle/schema'

describe('linksController (e2e)', () => {
  let app: INestApplication
  let drizzle: MySql2Database<typeof schema>

  const basePath = '/links'
  const validDomain = 'example.com'

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    drizzle = moduleFixture.get<MySql2Database<typeof schema>>(env.DATABASE_TAG)
  })

  beforeEach(async () => {
    await drizzle.delete(schema.links).execute()
  })

  afterAll(async () => {
    await drizzle.delete(schema.links).execute()
    await app.close()
  })

  it('should create a new link with provided key and return 201', async () => {
    const payload = {
      url: 'https://nestjs.com',
      key: 'customKey',
      domain: validDomain,
    }

    // eslint-disable-next-line ts/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .post(basePath)
      .send(payload)
      .expect(HttpStatus.CREATED)

    const body = response.body
    expect(body).toBeDefined()
    expect(body.key).toBe('customKey')
    expect(body.url).toBe('https://nestjs.com')
    expect(body.domain).toBe(validDomain)
    expect(body.shortLink).toBe(`http://${validDomain}/customKey`)
    expect(new Date(body.expires_at as string).getTime()).toBeGreaterThan(Date.now())
  })

  it('should generate a random key when none provided', async () => {
    const payload = {
      url: 'http://google.com',
      domain: validDomain,
    }

    // eslint-disable-next-line ts/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .post(basePath)
      .send(payload)
      .expect(HttpStatus.CREATED)

    const body = response.body
    expect(body.key).toBeDefined()
    expect(body.key).toMatch(/^[\w-]{6,}$/)
    expect(body.shortLink).toContain(`http://${validDomain}/`)
  })
})
