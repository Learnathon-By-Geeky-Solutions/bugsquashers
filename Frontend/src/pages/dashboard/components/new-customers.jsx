"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
  { month: "January", customers: 150, fill: "var(--color-jan)" },
  { month: "February", customers: 180, fill: "var(--color-feb)" },
  { month: "March", customers: 210, fill: "var(--color-mar)" },
  { month: "April", customers: 170, fill: "var(--color-apr)" },
  { month: "May", customers: 220, fill: "var(--color-may)" },
  { month: "June", customers: 250, fill: "var(--color-jun)" },
];

const chartConfig = {
  customers: {
    label: "New Customers",
  },
  jan: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  feb: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  mar: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  apr: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
  jun: {
    label: "June",
    color: "hsl(var(--chart-6))",
  },
} 

export function NewCustomersChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Customers</CardTitle>
        <CardDescription>Growth over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="customers" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="customers" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          New customer growth up by 8.9% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing new customer registrations for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
