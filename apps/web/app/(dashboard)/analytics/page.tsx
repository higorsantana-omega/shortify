import { getClicksLinks } from '../../../lib/actions/data/links'
import { AnalyticsContent } from './_components/analytics-content'
import { AnalyticsHeader } from './_components/analytics-header'

export default async function AnalyticsPage() {
  const result = await getClicksLinks()

  return (
    <>
      <AnalyticsHeader />
      <AnalyticsContent report={result.data || null} />
    </>
  )
}
