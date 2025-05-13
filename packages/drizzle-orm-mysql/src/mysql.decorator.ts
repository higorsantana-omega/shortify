import { Inject } from '@nestjs/common'

export function InjectDrizzle(configTag = 'default') {
  return Inject(configTag)
}
