'use client'

import { Button, Input, Label, Modal, Spinner } from '@shortify/ui/components'

import { useNewLinkModalController } from './useNewLinkModalController'

export function NewLinkModal() {
  const {
    isNewLinkModalOpen,
    toggleCloseNewLinkModal,

    handleSubmit,
    register,
    isLoading,
    errors,
  } = useNewLinkModalController()

  return (
    <Modal title='New Link' open={isNewLinkModalOpen} onClose={toggleCloseNewLinkModal}>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-2'>
          <div className='flex items-center'>
            <Label htmlFor='short-link' className='flex items-center gap-1.5'>
              Destination Url *
            </Label>
          </div>

          <Input
            type='text'
            error={errors.url?.message}
            placeholder='https://example.com'
            {...register('url')}
          />
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='short-link' className='flex items-center gap-1.5'>
              Short Link
            </Label>
          </div>

          <div className='flex w-full'>
            <div className='bg-muted border border-r-0 border-input rounded-l-md px-3 py-2 text-sm text-muted-foreground'>
              localhost:3006
            </div>
            <Input
              type='text'
              error={errors.key?.message}
              className='rounded-l-none'
              placeholder='4UtznWO'
              {...register('key')}
            />
          </div>
        </div>

        <div className='flex justify-end border-t border-border pl-6 pt-4'>
          <Button
            type='submit'
            disabled={isLoading}
            className='bg-primary text-primary-foreground hover:bg-primary/90'
          >
            {!isLoading && 'Create link'}
            {isLoading && <Spinner className='w-6 h-6' />}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
