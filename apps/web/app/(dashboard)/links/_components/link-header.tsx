import { Plus } from "lucide-react"

import { Button } from "@shortify/ui/components"

export function LinkHeader () {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Links</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create link
        </Button>
      </div>
    </div>
  )
}