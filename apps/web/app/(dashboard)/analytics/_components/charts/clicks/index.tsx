import { Card } from '@shortify/ui/components'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useDashboard } from '../../../../_components/dashboard-context/useDashboard'
import { ChartContent } from '../chart-content'
import { ChartHeader } from '../chart-header'
import { EmptyChart } from '../empty-chart'
import { AnalyticsSummary } from './analytics-summary'
import { DateRangeFilter } from './date-range-filter'

export function ClicksChart() {
  const { filteredClicksAnalyticsData, handleAnalyticsDataFilter } = useDashboard()

  return (
    <Card>
      <ChartHeader title='Click Analytics'>
        <DateRangeFilter
          onChange={range => handleAnalyticsDataFilter({ dateRange: range })}
        />
      </ChartHeader>

      <ChartContent>
        {filteredClicksAnalyticsData.length > 0
          ? (
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={filteredClicksAnalyticsData}>
                  <CartesianGrid strokeDasharray='3 3' className='stroke-muted' />
                  <XAxis
                    dataKey='time'
                    className='text-xs text-muted-foreground'
                  />
                  <YAxis
                    className='text-xs text-muted-foreground'
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius-md)',
                    }}
                  />
                  <Bar
                    dataKey='clicks'
                    fill='hsl(var(--primary))'
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )
          : (
              <EmptyChart message='No data available for the selected date range' />
            )}

      </ChartContent>

      <AnalyticsSummary />
    </Card>
  )
}
