import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common'
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

  @Get()
  getAll() {
    return this.linksService.getAll()
  }

  @Get(':id')
  getById(@Param() params: { id: string }) {
    return this.linksService.getById(params.id)
  }
}
