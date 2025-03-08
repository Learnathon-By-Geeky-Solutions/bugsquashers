"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
  { product: "Product A", buyers: 275, fill: "hsl(var(--primary))" },
  { product: "Product B", buyers: 200, fill: "hsl(var(--secondary))" },
  { product: "Product C", buyers: 287, fill: "hsl(var(--primary))" },
  { product: "Product D", buyers: 173, fill: "hsl(var(--accent))" },
  { product: "Other", buyers: 190, fill: "hsl(var(--secondary))" },
];

const chartConfig = {
  buyers: {
    label: "Buyers",
  },
  productA: {
    label: "Product A",
    color: "hsl(var(--chart-1))",
  },
  productB: {
    label: "Product B",
    color: "hsl(var(--chart-2))",
  },
  productC: {
    label: "Product C",
    color: "hsl(var(--chart-3))",
  },
  productD: {
    label: "Product D",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

// Move the Label content function outside the component
const renderLabelContent = ({ viewBox, totalBuyers }) => {
  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
    return (
      <text
        x={viewBox.cx}
        y={viewBox.cy}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan
          x={viewBox.cx}
          y={viewBox.cy}
          className="fill-foreground text-3xl font-bold"
        >
          {totalBuyers.toLocaleString()}
        </tspan>
        <tspan
          x={viewBox.cx}
          y={(viewBox.cy || 0) + 24}
          className="fill-muted-foreground"
        >
          Buyers
        </tspan>
      </text>
    );
  }
  return null;
};

export function ExpectedEarnings() {
  const totalBuyers = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.buyers, 0);
  }, []);

  return (
    <Card className="flex flex-col border border-muted">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expected Earnings - Buyers Distribution</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="buyers"
              nameKey="product"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={(props) => renderLabelContent({ ...props, totalBuyers })}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 7.5% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing expected earnings and buyers for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}