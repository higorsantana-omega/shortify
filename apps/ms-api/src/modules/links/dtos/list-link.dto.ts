import type { LinkData } from '@shortify/core'

export interface ListLinkDto extends LinkData {
  expired: boolean
}
