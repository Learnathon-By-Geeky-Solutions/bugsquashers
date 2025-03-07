"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts";

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
  ChartTooltipContent,
} from "../../../components/ui/chart";

const dailySalesData = [
  { day: "01 Mar", sales: 120 },
  { day: "02 Mar", sales: 150 },
  { day: "03 Mar", sales: 180 },
  { day: "04 Mar", sales: 90 },
  { day: "05 Mar", sales: 200 },
  { day: "06 Mar", sales: 170 },
  { day: "07 Mar", sales: 250 },
  { day: "08 Mar", sales: 220 },
  { day: "09 Mar", sales: 300 },
  { day: "10 Mar", sales: 270 },
];

const chartConfig = {
  sales: {
    label: "Daily Sales",
    color: "hsl(var(--primary))",
  },
} 

export function DailySalesChart() {
  return (
    <Card className="border border-muted">
      <CardHeader>
        <CardTitle>Daily Sales</CardTitle>
        <CardDescription>Tracking daily sales for the last 10 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={dailySalesData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Tooltip content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="sales"
              type="monotone"
              fill="hsl(var(--primary))"
              fillOpacity={0.4}
              stroke="hsl(var(--primary))"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 8.7% this week <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              March 1 - March 10, 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
