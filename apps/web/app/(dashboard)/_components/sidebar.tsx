'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@shortify/ui/lib'

import { getIcon } from '../_lib/get-icon'
import { sidebarItems } from '../_lib/constants'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className='h-screen w-52 bg-neutral-50 border-r border-neutral-200 flex flex-col'>
      <div className='p-4 border-b border-neutral-200'>
        <Link href='/' className='flex items-center gap-2 text-xl font-semibold'>
          <span className='text-black'>
            Shortify
          </span>
        </Link>
      </div>

      <div className='flex-1 py-4'>
        <nav className='space-y-1 px-2'>
          {sidebarItems.map(item => (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                'flex items-center gap-3 px-2 py-2 text-sm rounded-md transition-colors',
                'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100',
                pathname === item.path && 'bg-neutral-100 text-neutral-900'
              )}
            >
              {getIcon(item.icon)}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
