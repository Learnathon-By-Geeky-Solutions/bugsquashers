import { ChevronRight } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl md:text-2xl font-bold">FAIRBASKET</h1>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <span>Home</span>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium text-foreground">Dashboard</span>
      </div>
    </div>
  )
}

