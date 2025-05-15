export function ChartContent ({ children }: { children: React.ReactNode }) {
  return (
    <div className='p-4'>
      <div className='h-[400px]'>
        {children}
      </div>
    </div>
  )
}