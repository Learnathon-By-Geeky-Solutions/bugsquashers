import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { LineChart } from "../../../components/charts/line-chart"
import { MoreHorizontal, TrendingUp } from "lucide-react"
import { Button } from "../../../components/ui/button"

export function DiscountedSales() {
  const data = [
    { day: "Jun 04", value: 340 },
    { day: "Jun 05", value: 350 },
    { day: "Jun 06", value: 370 },
    { day: "Jun 07", value: 390 },
    { day: "Jun 08", value: 420 },
    { day: "Jun 09", value: 450 },
    { day: "Jun 10", value: 470 },
    { day: "Jun 11", value: 490 },
    { day: "Jun 12", value: 510 },
    { day: "Jun 13", value: 530 },
    { day: "Jun 14", value: 550 },
    { day: "Jun 15", value: 570 },
    { day: "Jun 16", value: 590 },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">$3,706</span>
            <div className="flex items-center text-sm text-green-500 font-medium">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              9.4%
            </div>
          </div>
          <CardTitle className="text-sm font-medium text-gray-500">Discounted Product Sales</CardTitle>
          <p className="text-xs text-gray-500 mt-1">Users from all channels</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-gray-500 mb-1">Total Discounted Sales this month</div>
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-2 text-xs">
            <div className="text-gray-500">$362</div>
            <div className="text-gray-500">$7</div>
            <div className="text-gray-500">$351</div>
            <div className="text-gray-500">$346</div>
            <div className="text-gray-500">$800</div>
          </div>
          <LineChart data={data} color="#3b82f6" />
        </div>
      </CardContent>
    </Card>
  )
}

