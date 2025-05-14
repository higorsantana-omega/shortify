import { Controller, Get, Param } from '@nestjs/common'
import { RedirectService } from './redirect.service'

@Controller({
  path: '',
})
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':key')
  async redirect(@Param() params: { key: string }) {
    const url = await this.redirectService.getUrlByKey(params.key)
    return { url }
  }
}
