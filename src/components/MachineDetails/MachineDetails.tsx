"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Clock3,
  Pause,
  Settings,
  Sparkles,
  Wrench,
} from "lucide-react";

type MachineDetailsProps = {
  dane?: Partial<{
    dostepnosc: number;
    dostepnosc_cel: number;
    wykorzystanie: number;
    wykorzystanie_cel: number;
    jakosc: number;
    jakosc_cel: number;
    awarie: number;
    konserwacje: number;
    czas_h: number;
    czas_min: number;
    czas_wykonania: number;
    czas_przezbrojenia: number;
    iloscSztapli: number;
    braki: number;
    iloscWyprodukowana: number;
    sprzatanie: number;
    przerwa: number;
  }>;
};

const getStatusColor = (value?: number, cel?: number) => {
  if (value === undefined || cel === undefined) {
    return "bg-muted text-muted-foreground border-border";
  }

  return value >= cel
    ? "bg-primary/10 text-primary border-primary/20"
    : "bg-destructive/10 text-destructive border-destructive/20";
};

export function MachineDetailsCard({ dane }: MachineDetailsProps) {
  const toPct = (val?: number) => ((val ?? 0) * 100).toFixed(1);
  const toMinutes = (val?: number) =>
    val === undefined ? "-" : `${Math.round(val)} min`;

  const kpis = [
    {
      key: "dostepnosc",
      label: "Dostępność",
      icon: Activity,
      value: dane?.dostepnosc,
      cel: dane?.dostepnosc_cel,
      details: [
        `Cel: ${toPct(dane?.dostepnosc_cel)}%`,
        `Czas dostępny: ${dane?.czas_h ?? "-"}h ${dane?.czas_min ?? "-"}m`,
        `Przezbrojenie: ${toMinutes(dane?.czas_przezbrojenia)}`,
      ],
    },
    {
      key: "wykorzystanie",
      label: "Wykorzystanie",
      icon: ArrowUp,
      value: dane?.wykorzystanie,
      cel: dane?.wykorzystanie_cel,
      details: [
        `Cel: ${toPct(dane?.wykorzystanie_cel)}%`,
        `Czas wykonania: ${toMinutes(dane?.czas_wykonania)}`,
        `Ilość przezbrojeń: ${dane?.iloscSztapli ?? "-"}`,
      ],
    },
    {
      key: "jakosc",
      label: "Jakość",
      icon: ArrowDown,
      value: dane?.jakosc,
      cel: dane?.jakosc_cel,
      details: [
        `Cel: ${toPct(dane?.jakosc_cel)}%`,
        `Braki: ${dane?.braki ?? "-"}`,
        `Wyprodukowane: ${dane?.iloscWyprodukowana ?? "-"}`,
      ],
    },
  ];

  return (
    <Card className="w-full mx-auto my-2 border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="h-5 w-5" /> Holzma
        </CardTitle>
        <CardDescription>Aktualne szczegóły produkcji na zmianie</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;

            return (
              <div key={kpi.key} className="rounded-xl border bg-card p-4 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Icon className="h-4 w-4" />
                    {kpi.label}
                  </div>
                  <span
                    className={cn(
                      "rounded-md border px-2 py-1 text-xs font-semibold",
                      getStatusColor(kpi.value, kpi.cel),
                    )}
                  >
                    {toPct(kpi.value)}%
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {kpi.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg border bg-muted/40 px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Wrench className="h-4 w-4" />
              Awarie
            </div>
            <span className="text-sm text-muted-foreground">{toMinutes(dane?.awarie)}</span>
          </div>
          <div className="rounded-lg border bg-muted/40 px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Settings className="h-4 w-4" />
              Konserwacje
            </div>
            <span className="text-sm text-muted-foreground">{toMinutes(dane?.konserwacje)}</span>
          </div>
          <div className="rounded-lg border bg-muted/40 px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Pause className="h-4 w-4" />
              Przerwa
            </div>
            <span className="text-sm text-muted-foreground">{toMinutes(dane?.przerwa)}</span>
          </div>
          <div className="rounded-lg border bg-muted/40 px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock3 className="h-4 w-4" />
              Sprzątanie
            </div>
            <span className="text-sm text-muted-foreground">{toMinutes(dane?.sprzatanie)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
