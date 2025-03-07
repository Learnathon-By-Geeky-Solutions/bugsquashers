"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Tooltip } from "recharts";

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

// Define chart configuration if required by ChartContainer
const chartConfig = {
  colors: { sales: "#31A04A" }, // Ensure the color is valid
};

const salesData = [
  { month: "January", sales: 1200 },
  { month: "February", sales: 1500 },
  { month: "March", sales: 1800 },
  { month: "April", sales: 1400 },
  { month: "May", sales: 1600 },
  { month: "June", sales: 1750 },
];

export function AvgMonthlySales() {
  return (
    <Card className="border border-muted">
      <CardHeader>
        <CardTitle>Average Monthly Sales</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={salesData}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            {/* Use recharts' default Tooltip as fallback */}
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="sales" fill={chartConfig.colors.sales} radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Sales up by 7.5% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing average monthly sales for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
