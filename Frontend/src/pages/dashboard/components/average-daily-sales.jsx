import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { BarChart } from "../../../components/charts/bar-chart"
import { MoreHorizontal, TrendingUp } from "lucide-react"
import { Button } from "../../../components/ui/button"

export function AverageDailySales() {
  const data = [
    { day: "Mon", value: 1800 },
    { day: "Tue", value: 2200 },
    { day: "Wed", value: 1500 },
    { day: "Thu", value: 2800 },
    { day: "Fri", value: 2000 },
    { day: "Sat", value: 2400 },
    { day: "Sun", value: 2100 },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">$2,420</span>
            <div className="flex items-center text-sm text-primary font-medium">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              3.4%
            </div>
          </div>
          <CardTitle className="text-sm font-medium text-gray-500">Average Daily Sales</CardTitle>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <BarChart data={data} />
      </CardContent>
    </Card>
  )
}

