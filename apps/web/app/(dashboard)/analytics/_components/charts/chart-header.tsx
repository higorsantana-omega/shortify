export function ChartHeader({
  children,
  title,
}: { children?: React.ReactNode, title: string }) {
  return (
    <div className='p-4 border-b'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>{title}</h2>
        {children && (
          <div className='flex items-center gap-2'>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
