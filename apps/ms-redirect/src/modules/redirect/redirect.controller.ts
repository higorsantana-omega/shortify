import { Controller, Get, Param, Redirect, Req } from '@nestjs/common'
import { Request } from 'express'
import { RedirectService } from './redirect.service'

@Controller({
  path: '',
})
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':key')
  @Redirect()
  async redirect(@Param() params: { key: string }, @Req() req: Request) {
    const url = await this.redirectService.getUrlByKey(params.key, {
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      referrer: req.headers.referer,
    })
    return { url }
  }
}
