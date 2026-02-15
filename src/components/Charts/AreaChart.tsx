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
import type { MachineData } from "@/types"

export const description = "A simple area chart"

const chartConfig = {
  wydajnosc: {
    label: "Wydajność",
    color: "var(--chart-1)",
  },
  awarie: {
    label: "Awarie",
    color: "var(--destructive)",
  },
} satisfies ChartConfig

type Punkt = {
  godzina: string
  wydajnosc: number
  awarieMinuty: number
  konserwacjeMinuty: number
  minuteOfDay: number
}

const parseTimeToMinutes = (time: string) => {
  const [hour, minute] = time.split(":").map(Number)

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return null
  }

  return hour * 60 + minute
}

const toPercent = (value: number) => (value <= 1 ? value * 100 : value)

const getAverageColor = (average: number) => {
  if (average < 60) {
    return "#ef4444"
  }

  if (average > 80) {
    return "#22c55e"
  }

  return "#facc15"
}

const toPunkt = (point: MachineData): Punkt | null => {
  const timestamp = point.data_aktualizacji
  const [, time = ""] = timestamp.split(" ")
  const [hour = "", minute = ""] = time.split(":")
  const godzina = `${hour}:${minute}`
  const minuteOfDay = parseTimeToMinutes(godzina)

  if (minuteOfDay === null) {
    return null
  }

  return {
    godzina,
    wydajnosc: toPercent(point.wykorzystanie),
    awarieMinuty: point.awarie_minuty,
    konserwacjeMinuty: point.konserwacje_minuty,
    minuteOfDay,
  }
}


export function ChartAreaDefault( {data}: {data?: MachineData[]} ) {
  const wydajnoscZmiana = (data ?? [])
    .map(toPunkt)
    .filter((point): point is Punkt => point !== null)

  const averageUtilization = wydajnoscZmiana.length
    ? wydajnoscZmiana.reduce((sum, point) => sum + point.wydajnosc, 0) / wydajnoscZmiana.length
    : 0
  const chartColor = getAverageColor(averageUtilization)

  const pointsWithTime = wydajnoscZmiana

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

  const awariaCount = wydajnoscZmiana.filter((point) => point.awarieMinuty > 0).length
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
            Śr. {averageUtilization.toFixed(1)}%
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
                content={
                  <ChartTooltipContent
                    indicator="line"
                    labelFormatter={(_, payload) => {
                      const point = payload?.[0]?.payload as Punkt | undefined

                      if (!point) {
                        return null
                      }

                      return point.awarieMinuty > 0
                        ? `${point.godzina} • Awaria: ${point.awarieMinuty} min`
                        : point.godzina
                    }}
                  />
                }
              />
              <Area
                dataKey="wydajnosc"
                type="natural"
                fill={chartColor}
                fillOpacity={0.4}
                stroke={chartColor}
                dot={({ cx, cy, payload }) => {
                  if (typeof cx !== "number" || typeof cy !== "number") {
                    return <g />
                  }

                  const point = payload as Punkt

                  if (point.awarieMinuty > 0) {
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill="var(--destructive)"
                        stroke="var(--background)"
                        strokeWidth={2}
                      />
                    )
                  }

                  return <circle cx={cx} cy={cy} r={2} fill={chartColor} />
                }}
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
            {awariaCount > 0 && (
              <div className="text-destructive flex items-center gap-2 leading-none">
                Wykryto awarie: {awariaCount} punktów
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
