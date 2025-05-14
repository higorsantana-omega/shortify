import { zodResolver } from '@hookform/resolvers/zod'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { z } from 'zod'

import { createLink } from '../../../../../../lib/actions/create-link'
import { useDashboard } from '../../../../_components/dashboard-context/useDashboard'

const schema = z.object({
  url: z
    .string()
    .url('Enter a valid URL')
    .min(1, 'URL is required'),
  key: z
    .string()
    .optional(),
})

type FormData = z.infer<typeof schema>

export function useNewLinkModalController() {
  const { isNewLinkModalOpen, toggleCloseNewLinkModal } = useDashboard()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    setIsLoading(true)

    const result = await createLink(data)

    if (result.success) {
      toast.success('Successfully created!')
      toggleCloseNewLinkModal()
      reset()
    }
    else {
      toast.success(result.message)
    }

    setIsLoading(false)
  })

  return {
    isNewLinkModalOpen,
    toggleCloseNewLinkModal,

    handleSubmit,
    register,
    isLoading,
    errors,
  }
}
