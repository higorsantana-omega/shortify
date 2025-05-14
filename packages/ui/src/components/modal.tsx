'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '../lib'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  title: string
  children: React.ReactNode
  onClose?(): void
}

export function Modal ({ children, open, title, onClose }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm',
            'data-[state=open]:animate-overlayShow'
          )}
        />

        <Dialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] w-full max-w-[400px]',
            'shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] outline-none',
            'data-[state=open]:animate-contentShow'
          )}
        >
          <header
            className='h-12 flex items-center justify-between text-gray-800'
          >
            <span className='text-lg tracking-[-1px] font-bold'>{title}</span>
            <button className='w-12 h-12 flex items-center justify-center outline-none' onClick={onClose}>
              <X className='size-4' />
            </button>
          </header>

          {children}
        </Dialog.Content >
      </Dialog.Portal>
    </Dialog.Root>
  )
}