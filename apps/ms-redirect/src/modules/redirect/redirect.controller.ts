import { Controller, Get, Param, Redirect } from '@nestjs/common'
import { RedirectService } from './redirect.service'

@Controller({
  path: '',
})
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':key')
  @Redirect()
  async redirect(@Param() params: { key: string }) {
    const url = await this.redirectService.getUrlByKey(params.key)
    return { url }
  }
}
