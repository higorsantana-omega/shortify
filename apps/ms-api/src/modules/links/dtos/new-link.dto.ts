import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const newLinkDto = z.object({
  key: z.string().optional(),
  domain: z.string().optional().default('localhost:3001'),
  url: z.string(),
})

export class NewLinkDto extends createZodDto(newLinkDto) {}
