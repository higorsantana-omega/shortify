import { Sidebar } from './_components/sidebar'

import { DashboardProviders } from './providers'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <DashboardProviders>
      <div className='flex'>
        <Sidebar />
        <main className='flex-1'>
          <div className='flex-1 bg-background min-h-screen'>
            <div className='max-w-screen-xl mx-auto px-4 py-6'>
              {children}
            </div>
          </div>
        </main>
      </div>
    </DashboardProviders>
  )
}
