'use client'

import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  className?: string
  appName: string
}

export function Button({ children, className, appName }: ButtonProps) {
  return (
    <button
      type='button'
      className={className}
      onClick={() => console.warn(appName)}
    >
      {children}
    </button>
  )
}
