"use client"

import { Gauge, Minus, TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A simple area chart"

const chartConfig = {
  wydajnosc: {
    label: "Wydajność",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type WydajnoscPunkt = {
  godzina: string
  wydajnosc: number
}

const parseTimeToMinutes = (time: string) => {
  const [hour, minute] = time.split(":").map(Number)

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return null
  }

  return hour * 60 + minute
}

export function ChartAreaDefault({ wydajnoscZmiana }: { wydajnoscZmiana: WydajnoscPunkt[] }) {
  const currentUtilization = wydajnoscZmiana[wydajnoscZmiana.length - 1]?.wydajnosc ?? 0

  const pointsWithTime = wydajnoscZmiana
    .map((point) => ({
      ...point,
      minuteOfDay: parseTimeToMinutes(point.godzina),
    }))
    .filter((point): point is WydajnoscPunkt & { minuteOfDay: number } => point.minuteOfDay !== null)

  const fallbackPoints = pointsWithTime.slice(-5)
  const lastMinute = pointsWithTime[pointsWithTime.length - 1]?.minuteOfDay

  const lastHourPoints =
    lastMinute === undefined
      ? fallbackPoints
      : pointsWithTime.filter((point) => {
          const delta = lastMinute - point.minuteOfDay
          return delta >= 0 && delta <= 60
        })

  const trendWindowPoints = lastHourPoints.length >= 2 ? lastHourPoints : fallbackPoints
  const trendValues = trendWindowPoints.map((point) => point.wydajnosc)

  const firstTrendValue = trendValues[0] ?? 0
  const lastTrendValue = trendValues[trendValues.length - 1] ?? 0
  const trendRange = trendValues.length
    ? Math.max(...trendValues) - Math.min(...trendValues)
    : 0

  const isStableTrend = trendRange <= 5
  const isDowntrend = !isStableTrend && lastTrendValue < firstTrendValue

  const trendColor = isStableTrend ? "#facc15" : isDowntrend ? "#ef4444" : "#22c55e"
  const trendLabel = isStableTrend
    ? "Trend stabilny"
    : isDowntrend
      ? "Trend spadkowy"
      : "Trend wzrostowy"
  const TrendIcon = isStableTrend ? Minus : isDowntrend ? TrendingDown : TrendingUp

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">  
        <div className="flex flex-col gap-2">
  <CardTitle className="text-xl">Wykres wykorzystania</CardTitle>
        <CardDescription>
          Trend od początku zmiany
        </CardDescription>
        </div>
      
        <div className=" z-10 flex items-center gap-1 rounded-md bg-background/90 px-2 py-1 text-sm font-semibold">
            <Gauge className="h-5 w-5" />
            {currentUtilization.toFixed(1)}%
          </div>
      </CardHeader>
      <CardContent>
        <div className="relative">

          <ChartContainer config={chartConfig} className="w-full h-[380px] aspect-auto">
            <AreaChart
              accessibilityLayer
              data={wydajnoscZmiana}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="godzina"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={24}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="wydajnosc"
                type="natural"
                fill={trendColor}
                fillOpacity={0.4}
                stroke={trendColor}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {trendLabel} <TrendIcon className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Ocena trendu z ostatniej godziny (próg stabilności: 5%)
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
