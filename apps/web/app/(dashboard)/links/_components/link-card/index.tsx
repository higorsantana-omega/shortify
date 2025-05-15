'use client'

import type { LinkData } from '../../../../../lib/actions/types'

import { Badge, Button } from '@shortify/ui/components'
import { cn } from '@shortify/ui/lib'

import { Clock, Copy, ExternalLinkIcon, Globe2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { formatTimeAgo } from '../../../../../lib/date-utils'

export function LinkCard({ link }: { link: LinkData }) {
  const [copied, setCopied] = useState(false)
  const [clicks, _] = useState(2)
  const [timeRemaining, setTimeRemaining] = useState<string>('')
  const [isLinkExpired, setIsLinkExpired] = useState(link?.expired ?? false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const openLink = (url: string) => {
    window.open(url, '_blank')
  }

  const handleLinkExpired = useCallback(() => {
    setIsLinkExpired(true)
  }, [])

  const calculateTimeLeft = useCallback(() => {
    if (!link.expires_at) {
      return ''
    }

    const now = new Date().getTime()
    const expirationDate = new Date(link.expires_at).getTime()
    const timeDifference = expirationDate - now

    if (timeDifference <= 0) {
      handleLinkExpired()
      return '0m'
    }

    const minutesRemaining = Math.floor(timeDifference / 1000 / 60)
    return `${minutesRemaining}m`
  }, [link.expires_at, handleLinkExpired])

  const updateTimeRemaining = useCallback(() => {
    const currentTime = calculateTimeLeft()
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setTimeRemaining(currentTime)
  }, [calculateTimeLeft])

  useEffect(() => {
    updateTimeRemaining()

    const timerInterval = setInterval(updateTimeRemaining, 60000)

    return () => clearInterval(timerInterval)
  }, [updateTimeRemaining])

  return (
    <div className={cn(
      'card p-4 group transition-all duration-300 hover:border-primary/20',
      isLinkExpired && 'opacity-75 hover:opacity-90 border-neutral-200',
    )}
    >
      <div className='flex items-start justify-between mb-3'>
        <div className='flex items-center gap-2'>
          <div className='h-6 w-6 flex items-center justify-center bg-primary/10 rounded-full'>
            <Globe2 className='h-3.5 w-3.5 text-primary' />
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='sm'
              className='h-8 px-2 text-foreground font-medium hover:bg-primary/10 hover:text-primary'
              onClick={() => copyToClipboard(link.shortLink)}
              disabled={isLinkExpired}
            >
              {link.shortLink}
              <Copy className={
                cn(
                  'ml-1.5 h-3.5 w-3.5 text-muted-foreground',
                  copied && 'text-success',
                )
              }
              />
            </Button>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          {link.expires_at && (
            <Badge
              variant='outline'
              className={`flex items-center gap-1 ${
                isLinkExpired
                  ? 'text-error bg-error/10 border-error/20'
                  : 'text-warning bg-warning/10 border-warning/20'
              }`}
            >
              <Clock className='h-3 w-3' />
              {isLinkExpired ? 'Expired' : timeRemaining}
            </Badge>
          )}
          <Badge variant='outline' className='text-muted-foreground bg-muted/50'>
            {formatTimeAgo(link.created_at.toString())}
          </Badge>
        </div>
      </div>

      <div className='pl-8 text-sm text-muted-foreground flex flex-col gap-1'>
        <div className='flex items-center gap-2 truncate max-w-full overflow-hidden group'>
          <span className='truncate group-hover:text-foreground transition-colors'>
            {link.url}
          </span>
          <Button
            variant='ghost'
            size='icon'
            className='h-6 w-6 hover:bg-primary/10'
            onClick={() => openLink(link.url)}
          >
            <ExternalLinkIcon className='h-3.5 w-3.5' />
          </Button>
        </div>

        <div className='flex items-center gap-1'>
          <Badge
            variant='outline'
            className={
              cn(
                'text-xs text-muted-foreground bg-muted/50',
                clicks > 0 && 'text-primary bg-primary/10 border-primary/20',
              )
            }
          >
            {clicks}
            {' '}
            {clicks === 1 ? 'click' : 'clicks'}
          </Badge>
        </div>
      </div>
    </div>
  )
}
