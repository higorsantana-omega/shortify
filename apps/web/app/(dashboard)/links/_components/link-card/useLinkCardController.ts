import type { LinkData } from '../../../../../lib/actions/types'
import { useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'

const NOTIFICATION_DURATION_MS = 2000 // 2s
const UPDATE_INTERVAL_MS = 60000 // 1min
const MILLISECONDS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60

export function useLinkCardController({ link }: { link: LinkData }) {
  const [isClipboardCopied, setIsClipboardCopied] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<string>('')
  const [isLinkExpired, setIsLinkExpired] = useState(link?.expired ?? false)

  const handleCopyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setIsClipboardCopied(true)
    toast.success('Copied to clipboard')

    const resetCopyTimeout = setTimeout(() => {
      setIsClipboardCopied(false)
    }, NOTIFICATION_DURATION_MS)

    return () => clearTimeout(resetCopyTimeout)
  }, [])

  const handleOpenLink = useCallback((url: string) => {
    window.open(url, '_blank')
  }, [])

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

    const minutesRemaining = Math.floor(timeDifference / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE))
    return `${minutesRemaining}m`
  }, [link.expires_at, handleLinkExpired])

  const updateTimeRemaining = useCallback(() => {
    const currentTime = calculateTimeLeft()
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setTimeRemaining(currentTime)
  }, [calculateTimeLeft])

  useEffect(() => {
    updateTimeRemaining()

    const timerInterval = setInterval(updateTimeRemaining, UPDATE_INTERVAL_MS)

    return () => clearInterval(timerInterval)
  }, [updateTimeRemaining])

  return {
    isClipboardCopied,
    handleCopyToClipboard,
    handleOpenLink,
    timeRemaining,
    isLinkExpired,
  }
}
