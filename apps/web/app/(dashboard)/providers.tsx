'use client'

import { DashboardProvider } from './_components/dashboard-context'

export function DashboardProviders({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      {children}
    </DashboardProvider>
  )
}
