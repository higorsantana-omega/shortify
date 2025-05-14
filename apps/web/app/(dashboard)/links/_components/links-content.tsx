import type { LinkData } from '../../../../lib/actions/types'

import { LinkCard } from './link-card'

export function LinksContent({ links }: { links: LinkData[] }) {
  return (
    <>
      {(!links || links.length === 0) && (
        <>
          <div className='text-center py-8'>
            <p className='text-muted-foreground'>No links found</p>
          </div>
        </>
      )}

      {links && links.length > 0 && (
        <>
          <div
            className='space-y-3 links-container'
          >
            {links.map(link => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
