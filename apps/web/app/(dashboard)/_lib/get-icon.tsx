import { BarChart3, Link2 } from 'lucide-react'

export function getIcon(icon: string) {
  switch (icon) {
    case 'link':
      return <Link2 className='h-4 w-4' />
    case 'chart':
      return <BarChart3 className='h-4 w-4' />
    default:
      return <Link2 className='h-4 w-4' />
  }
}
