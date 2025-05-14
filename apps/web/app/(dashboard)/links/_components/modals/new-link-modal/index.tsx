'use client'

import { Modal } from "@shortify/ui/components"

import { useDashboard } from "../../../../_components/dashboard-context/useDashboard"

export function NewLinkModal () {
  const { isNewLinkModalOpen, toggleCloseNewLinkModal } = useDashboard()

  return (
    <Modal title='New Link' open={isNewLinkModalOpen} onClose={toggleCloseNewLinkModal}>
      teste
    </Modal>
  )
}