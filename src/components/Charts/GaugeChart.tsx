"use client";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import {
  Label,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

export const description = "A radial chart with text";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type ChartRadialTextProps = {
  label: string;
  value: number;
  large?: boolean;
};

const clampPercentage = (value: number) => Math.max(0, Math.min(100, value));

const getColor = (value: number) => {
  if (value >= 90) return "#22c55e"; // zielony
  if (value >= 70) return "#facc15"; // żółty
  return "#ef4444"; // czerwony
};

const getIndicator = (value: number) => {
  if (value >= 90) {
    return {
      trend: "Trend wzrostowy",
      status: "bardzo dobry",
      Icon: TrendingUp,
    };
  }

  if (value >= 70) {
    return {
      trend: "Trend stabilny",
      status: "umiarkowany",
      Icon: Minus,
    };
  }

  return {
    trend: "Trend spadkowy",
    status: "wymaga poprawy",
    Icon: TrendingDown,
  };
};

export function ChartRadialText({ label, value, large = false }: ChartRadialTextProps) {
  const safeValue = clampPercentage(value);
  const color = getColor(safeValue);
  const indicator = getIndicator(safeValue);
  const containerHeightClass = large ? "max-h-[380px]" : "max-h-[320px]";
  const innerRadius = large ? 104 : 92;
  const outerRadius = large ? 144 : 126;
  const valueTextClass = large
    ? "fill-foreground text-5xl font-bold"
    : "fill-foreground text-4xl font-bold";

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-1">
        <CardTitle className="text-2xl">{label}</CardTitle>
        <CardDescription>Status na bieżącej zmianie</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className={`mx-auto aspect-square ${containerHeightClass}`}
        >
          <RadialBarChart
            data={[{ name: label, value: safeValue }]}
            startAngle={90}
            endAngle={-270}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[innerRadius, (innerRadius + outerRadius) / 2, outerRadius]}
            />
            <RadialBar
              dataKey="value"
              background={safeValue < 100}
              cornerRadius={safeValue === 100 ? 0 : 10}
              fill={color}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
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
                          className={valueTextClass}
                        >
                          {Math.round(safeValue)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {label}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {indicator.trend} <indicator.Icon className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Stan: {indicator.status} · Cel operatora: ≥ 90%
        </div>
      </CardFooter>
    </Card>
  );
}
