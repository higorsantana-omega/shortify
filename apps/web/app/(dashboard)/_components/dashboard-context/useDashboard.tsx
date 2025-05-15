import { use } from 'react'
import { DashboardContext } from '.'

export function useDashboard() {
  return use(DashboardContext)
}
