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
        {children}
      </main>
    </div>
  )
}
