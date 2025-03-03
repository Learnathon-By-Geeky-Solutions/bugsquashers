import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { DonutChart } from "../../../components/charts/donut-chart"
import { MoreHorizontal, TrendingUp } from "lucide-react"
import { Button } from "../../../components/ui/button"

export function ExpectedEarnings() {
  const data = [
    { name: "Egg", value: 57860, color: "#66D47E" },
    { name: "Rice", value: 32820, color: "#FFD55A" },
    { name: "Others", value: 25257, color: "#F4AF1B" },
  ]

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-bold">$69,700</span>
            <div className="flex items-center text-sm text-primary font-medium">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              2.2%
            </div>
          </div>
          <CardTitle className="text-sm font-medium text-gray-500">Expected Earnings</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className="shrink-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-1/2 max-w-[200px]">
            <DonutChart data={data} />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col justify-center gap-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium ml-auto">${(item.value / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

