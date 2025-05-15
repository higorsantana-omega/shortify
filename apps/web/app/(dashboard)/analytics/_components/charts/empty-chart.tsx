import { LineChart } from "lucide-react";

export function EmptyChart ({ message }: { message: string }) {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-4">
      <LineChart className="h-12 w-12 text-muted-foreground/50" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  )
}