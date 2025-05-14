import { Sidebar } from './_components/sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1'>
        <div className="flex-1 bg-background min-h-screen">
          <div className="max-w-screen-xl mx-auto px-4 py-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
