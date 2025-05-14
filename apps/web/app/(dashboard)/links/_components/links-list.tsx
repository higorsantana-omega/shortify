'use client'

import type { ApiResponse, LinkData } from '../../../../lib/actions/types'
import { Suspense } from 'react'

import toast from 'react-hot-toast'
import { LinksContent } from './links-content'
import LinksSkeleton from './links-list-skeleton'

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
        <Suspense fallback={<LinksSkeleton />}>
          <LinksContent links={data ?? []} />
        </Suspense>
      </div>
    </div>
  )
}
