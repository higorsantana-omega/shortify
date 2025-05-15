import { Button } from '@shortify/ui/components'
import { Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center'>
      <div className='text-center space-y-6 px-4'>
        <h1 className='text-8xl font-bold text-primary'>404</h1>
        <h2 className='text-2xl font-semibold text-foreground'>Page not found</h2>
        <p className='text-muted-foreground max-w-md mx-auto'>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href='/links'>
          <Button className='mt-4'>
            <Home className='mr-2 h-4 w-4' />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
