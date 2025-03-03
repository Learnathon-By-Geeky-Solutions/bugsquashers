import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { LineChart } from "../../../components/charts/line-chart"
import { MoreHorizontal, TrendingUp } from "lucide-react"
import { Button } from "../../../components/ui/button"

export function SalesThisMonth() {
  const data = [
    { day: "Jun 04", value: 17000 },
    { day: "Jun 05", value: 20000 },
    { day: "Jun 06", value: 19000 },
    { day: "Jun 07", value: 18000 },
    { day: "Jun 08", value: 22000 },
    { day: "Jun 09", value: 24000 },
    { day: "Jun 10", value: 25000 },
    { day: "Jun 11", value: 27000 },
    { day: "Jun 12", value: 20000 },
    { day: "Jun 13", value: 18000 },
    { day: "Jun 14", value: 22000 },
    { day: "Jun 15", value: 24000 },
    { day: "Jun 16", value: 23000 },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">$14,094</span>
            <div className="flex items-center text-sm text-primary font-medium">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              4.6%
            </div>
          </div>
          <CardTitle className="text-sm font-medium text-gray-500">Sales this months</CardTitle>
          <p className="text-xs text-gray-500 mt-1">Users from all channels</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-gray-500 mb-1">Another $48,346 to goal</div>
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-2 text-xs">
            <div className="text-gray-500">$24K</div>
            <div className="text-gray-500">$20.5K</div>
            <div className="text-gray-500">$17K</div>
            <div className="text-gray-500">$13.5K</div>
            <div className="text-gray-500">$10K</div>
          </div>
          <LineChart data={data} color="#10b981" />
        </div>
      </CardContent>
    </Card>
  )
}

