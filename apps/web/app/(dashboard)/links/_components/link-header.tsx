import { LinkButtonCreateLink } from "./link-button-create-link"

export function LinkHeader () {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Links</h1>
      </div>

      <div className="flex items-center gap-2">
        <LinkButtonCreateLink />
      </div>
    </div>
  )
}