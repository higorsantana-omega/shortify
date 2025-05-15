import { createContext, useCallback, useState } from 'react'

import type { AccessedUrlsAnalytics, ClickAnalytics } from '../../analytics/_lib/analytics-data-adapter'

export interface AnalyticsFilters {
  dateRange: {
    from: Date
    to?: Date
  }
}

export interface DashboardContextValue {
  isNewLinkModalOpen: boolean
  toggleOpenNewLinkModal: () => void
  toggleCloseNewLinkModal: () => void

  clicksAnalyticsData: ClickAnalytics[]
  accessedUrlsAnalyticsData: AccessedUrlsAnalytics[]
  filteredClicksAnalyticsData: ClickAnalytics[]
  handleAnalyticsData: (data: { clicks: ClickAnalytics[], accessedUrls: AccessedUrlsAnalytics[] }) => void
  handleAnalyticsDataFilter: (filters: AnalyticsFilters) => void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [isNewLinkModalOpen, setNewLinkModalOpen] = useState(false)

  const [clicksAnalyticsData, setClicksAnalyticsData] = useState<ClickAnalytics[]>([])
  const [accessedUrlsAnalyticsData, setAccessedUrlsAnalyticsData] = useState<AccessedUrlsAnalytics[]>([])
  const [filteredClicksAnalyticsData, setFilteredClicksAnalyticsData] = useState<ClickAnalytics[]>([])

  const toggleOpenNewLinkModal = useCallback(() => {
    setNewLinkModalOpen(true)
  }, [])

  const toggleCloseNewLinkModal = useCallback(() => {
    setNewLinkModalOpen(false)
  }, [])

  const handleAnalyticsData = useCallback((data: { clicks: ClickAnalytics[], accessedUrls: AccessedUrlsAnalytics[] }) => {
    setClicksAnalyticsData(data.clicks)
    setFilteredClicksAnalyticsData(data.clicks)

    setAccessedUrlsAnalyticsData(data.accessedUrls)
  }, [])

  const handleAnalyticsDataFilter = useCallback((filters: AnalyticsFilters) => {
    const { dateRange } = filters

    const filteredData = clicksAnalyticsData.filter((item) => {
      const itemDate = new Date(item.time)
      if (dateRange.from && dateRange.to) {
        return itemDate >= dateRange.from && itemDate <= dateRange.to
      }
      return itemDate >= dateRange.from
    })

    setFilteredClicksAnalyticsData(filteredData)
  }, [clicksAnalyticsData])

  return (
    <DashboardContext value={{
      isNewLinkModalOpen,
      toggleOpenNewLinkModal,
      toggleCloseNewLinkModal,

      clicksAnalyticsData,
      filteredClicksAnalyticsData,
      accessedUrlsAnalyticsData,
      handleAnalyticsData,
      handleAnalyticsDataFilter,
    }}
    >
      {children}
    </DashboardContext>
  )
}
