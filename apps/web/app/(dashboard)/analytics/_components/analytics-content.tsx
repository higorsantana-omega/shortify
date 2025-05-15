'use client'

import type { LinkReport } from '../../../../lib/actions/types'
import { useEffect } from 'react'
import { useDashboard } from '../../_components/dashboard-context/useDashboard'
import { clicksAnalyticsDataAdapter, mostAccessedUrlsAdapter } from '../_lib/analytics-data-adapter'
import { MostAccessedUrlChart } from './charts/most-accessed-url'
import { ClicksChart } from './charts/clicks'

interface AnalyticsContentProps {
  report: LinkReport | null
}

export function AnalyticsContent({ report }: AnalyticsContentProps) {
  const { handleAnalyticsData } = useDashboard()

  useEffect(() => {
    handleAnalyticsData({
      clicks: clicksAnalyticsDataAdapter(report as LinkReport),
      accessedUrls: mostAccessedUrlsAdapter(report as LinkReport)
    })
  }, [handleAnalyticsData, report])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <ClicksChart />
      <MostAccessedUrlChart />
    </div>
  )
}
