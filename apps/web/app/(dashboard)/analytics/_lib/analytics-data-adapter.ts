import type { LinkReport } from '../../../../lib/actions/types'

export interface ClickAnalytics {
  clicks: number
  time: string
}

export interface AccessedUrlsAnalytics {
  url: string
  clicks: number
}

export function clicksAnalyticsDataAdapter(report: LinkReport): ClickAnalytics[] {
  if (!report)
    return []

  const data: ClickAnalytics[] = report.mostActivePeriod.map((r) => {
    return {
      clicks: r.count,
      time: r.date,
    }
  })

  return data
}

export function mostAccessedUrlsAdapter(report: LinkReport): AccessedUrlsAnalytics[] {
  if (!report)
    return []

  const data: AccessedUrlsAnalytics[] = report.mostAccessedUrls.map((r) => {
    return {
      clicks: r.count,
      url: r.url.replace('https://', '').slice(0, 20) + (r.url.length > 20 ? '...' : ''),
    }
  })

  return data
}
