'use client'

import { Button } from '@shortify/ui/components'

import { Plus } from 'lucide-react'

import { useDashboard } from '../../_components/dashboard-context/useDashboard'

export function LinkButtonCreateLink() {
  const { toggleOpenNewLinkModal } = useDashboard()

  return (
    <Button
      className='bg-primary text-primary-foreground hover:bg-primary/90'
      onClick={() => toggleOpenNewLinkModal()}
    >
      <Plus className='h-4 w-4 mr-2' />
      Create link
    </Button>
  )
}
