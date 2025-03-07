"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";

const chartData = [
  { month: "January", discountedSales: 120 },
  { month: "February", discountedSales: 180 },
  { month: "March", discountedSales: 210 },
  { month: "April", discountedSales: 90 },
  { month: "May", discountedSales: 250 },
  { month: "June", discountedSales: 300 },
];

const chartConfig = {
  discountedSales: {
    label: "Discounted Sales",
    color: "hsl(var(--chart-1))",
  },
} 

export function DiscountedSalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Discounted Product Sales</CardTitle>
        <CardDescription>
          Tracking sales of discounted products over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
<<<<<<< HEAD
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="discountedSales"
              type="linear"
              fill="hsl(var(--primary))"
              fillOpacity={0.4}
              stroke="hsl(var(--primary))"
            />
          </AreaChart>
        </ChartContainer>
=======
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
>>>>>>> d07bb9dcaff2ebcdb59b5a388105e2f013feb992
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Discounted sales up by 12.5% this month{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
