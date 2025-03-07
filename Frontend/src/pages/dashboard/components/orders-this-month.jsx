import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { TrendingDown } from "lucide-react"
import { Progress } from "../../../components/ui/progress"

export function OrdersThisMonth() {
  return (
    <Card className="border border-muted">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">1,836</span>
          <div className="flex items-center text-sm text-red-500 font-medium">
            <TrendingDown className="h-3.5 w-3.5 mr-1" />
            2.2%
          </div>
        </div>
        <CardTitle className="text-sm font-medium text-gray-500">Orders this Month</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>1,048 to Goal</span>
            <span className="font-medium">82%</span>
          </div>
          <Progress value={82} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
        </div>
      </CardContent>
    </Card>
  )
}

