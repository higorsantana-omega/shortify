import type { LinkData } from '../../../../lib/actions/types'

import { LinkCard } from './link-card'

export function LinksList({ links }: { links: LinkData[] }) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='h-[calc(100vh-120px)] overflow-y-auto pr-4 -mr-4'>
        {links.length === 0 && (
          <>
            <div className='text-center py-8'>
              <p className='text-muted-foreground'>No links found</p>
            </div>
          </>
        )}

        {links.length > 0 && (
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
      </div>
    </div>
  )
}
