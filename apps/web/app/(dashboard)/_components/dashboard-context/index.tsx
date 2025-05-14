import { createContext, useCallback, useState } from "react"

export interface DashboardContextValue {
  isNewLinkModalOpen: boolean
  toggleOpenNewLinkModal(): void
  toggleCloseNewLinkModal(): void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [isNewLinkModalOpen, setNewLinkModalOpen] = useState(false)

  const toggleOpenNewLinkModal = useCallback(() => {
    setNewLinkModalOpen(true)
  }, [])

  const toggleCloseNewLinkModal = useCallback(() => {
    setNewLinkModalOpen(false)
  }, [])

  return (
    <DashboardContext.Provider value={{
      isNewLinkModalOpen,
      toggleOpenNewLinkModal,
      toggleCloseNewLinkModal,
    }}>
      {children}
    </DashboardContext.Provider>
  )
}