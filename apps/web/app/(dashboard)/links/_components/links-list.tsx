'use client'

import type { ApiResponse, LinkData } from '../../../../lib/actions/types'
import toast from 'react-hot-toast'

import { LinkCard } from './link-card'

interface LinksListProps {
  response: ApiResponse<LinkData[]>
}

export function LinksList({ response: { data, success, message } }: LinksListProps) {
  if (!success) {
    toast.error(message)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='h-[calc(100vh-120px)] overflow-y-auto pr-4 -mr-4'>
        {(!data || data.length === 0) && (
          <>
            <div className='text-center py-8'>
              <p className='text-muted-foreground'>No links found</p>
            </div>
          </>
        )}

        {data && data.length > 0 && (
          <>
            <div
              className='space-y-3 links-container'
            >
              {data.map(link => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
