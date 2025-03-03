import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"

export function NewCustomers() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="text-2xl font-bold">6.3k</div>
        <CardTitle className="text-sm font-medium text-gray-500">New Customers this Month</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-16 flex items-center justify-center text-gray-400 text-sm">+5% from last month</div>
      </CardContent>
    </Card>
  )
}

