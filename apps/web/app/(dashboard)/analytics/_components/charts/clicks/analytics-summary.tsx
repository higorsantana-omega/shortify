import { useDashboard } from '../../../../_components/dashboard-context/useDashboard'

export function AnalyticsSummary() {
  const { filteredClicksAnalyticsData } = useDashboard()
  return (
    <div className='p-4 border-t'>
      <div className='grid grid-cols-4 md:grid-cols-4 gap-4'>
        <div>
          <h3 className='text-sm font-medium text-muted-foreground'>Total Clicks</h3>
          <p className='text-2xl font-bold'>
            {filteredClicksAnalyticsData.reduce((sum, item) => sum + item.clicks, 0)}
          </p>
        </div>
        <div>
          <h3 className='text-sm font-medium text-muted-foreground'>Avg. Clicks</h3>
          <p className='text-2xl font-bold'>
            {
              filteredClicksAnalyticsData.reduce((sum, item) => sum + item.clicks, 0) > 0 ? Math.round(filteredClicksAnalyticsData.reduce((sum, item) => sum + item.clicks, 0) / filteredClicksAnalyticsData.length) : 0
            }
          </p>
        </div>
      </div>
    </div>
  )
}
