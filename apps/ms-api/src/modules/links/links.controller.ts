import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { NewLinkDto } from './dtos/new-link.dto'
import { LinksService } from './links.service'

@Controller({
  path: 'links',
  version: '1',
})
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  me(@Body() link: NewLinkDto) {
    return this.linksService.create(link)
  }
}
