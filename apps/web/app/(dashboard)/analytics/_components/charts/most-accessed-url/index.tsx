'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card } from "@shortify/ui/components"

import { ChartHeader } from "../chart-header"
import { ChartContent } from "../chart-content"
import { useDashboard } from '../../../../_components/dashboard-context/useDashboard'
import { EmptyChart } from '../empty-chart'

export function MostAccessedUrlChart() {
  const { accessedUrlsAnalyticsData } = useDashboard()
  return (
    <Card>
      <ChartHeader title='Most Accessed URLs' />

      <ChartContent>
        {accessedUrlsAnalyticsData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={accessedUrlsAnalyticsData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
              <XAxis type="number" className="text-xs text-muted-foreground" />
              <YAxis
                type="category"
                dataKey="url"
                width={150}
                className="text-xs text-muted-foreground"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius-md)',
                }}
              />
              <Bar
                dataKey="clicks"
                fill="hsl(var(--secondary))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart message='No URL data available' />
        )}

      </ChartContent>
    </Card>
  )
}