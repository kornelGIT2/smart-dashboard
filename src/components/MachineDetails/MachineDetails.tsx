"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowUp, ArrowDown, Activity } from "lucide-react";
import { Wrench } from "lucide-react";
import { Settings } from "lucide-react";

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
  if (value === undefined || cel === undefined) return "bg-gray-300";
  return value >= cel ? "bg-green-500" : "bg-red-500";
};

export function MachineDetailsCard({ dane }: MachineDetailsProps) {
  const toPct = (val?: number) => ((val ?? 0) * 100).toFixed(1);

  return (
    <Card className="w-full max-w-5xl mx-auto my-6 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle>Stan maszyny</CardTitle>
        <CardDescription>Aktualne szczegóły produkcji</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dostępność */}
        <div className="p-4 border rounded-lg bg-white shadow-sm flex flex-col">
          <div
            className={`flex items-center justify-center p-2 rounded text-white font-bold mb-2 ${getStatusColor(
              dane?.dostepnosc,
              dane?.dostepnosc_cel,
            )}`}
          >
            <Activity className="mr-2 w-5 h-5" /> Dostępność:{" "}
            {toPct(dane?.dostepnosc)}%
          </div>
          <div className="text-sm space-y-1">
            <div>Cel: {dane?.dostepnosc_cel ?? "-"}%</div>
            <div>
              Czas dostępny: {dane?.czas_h ?? "-"}H {dane?.czas_min ?? "-"}M
            </div>
            <div>
              Czas na przezbrojenie:{" "}
              {dane?.czas_przezbrojenia?.toFixed(1) ?? "-"} min
            </div>
            <div>Ilość przezbrojeń: {dane?.iloscSztapli ?? "-"}</div>
          </div>
        </div>

        {/* Wykorzystanie */}
        <div className="p-4 border rounded-lg bg-white shadow-sm flex flex-col">
          <div
            className={`flex items-center justify-center p-2 rounded text-white font-bold mb-2 ${getStatusColor(
              dane?.wykorzystanie,
              dane?.wykorzystanie_cel,
            )}`}
          >
            <ArrowUp className="mr-2 w-5 h-5" /> Wykorzystanie:{" "}
            {toPct(dane?.wykorzystanie)}%
          </div>
          <div className="text-sm space-y-1">
            <div>Cel: {dane?.wykorzystanie_cel ?? "-"}%</div>
            <div>
              Czas wykonania: {Math.round(dane?.czas_wykonania ?? 0)} min
            </div>
            <div>Czas teoretyczny: {dane?.czas_wykonania ?? "-"} min</div>
          </div>
        </div>

        {/* Jakość */}
        <div className="p-4 border rounded-lg bg-white shadow-sm flex flex-col">
          <div
            className={`flex items-center justify-center p-2 rounded text-white font-bold mb-2 ${getStatusColor(
              dane?.jakosc,
              dane?.jakosc_cel,
            )}`}
          >
            <ArrowDown className="mr-2 w-5 h-5" /> Jakość: {toPct(dane?.jakosc)}
            %
          </div>
          <div className="text-sm space-y-1">
            <div>Cel: {dane?.jakosc_cel ?? "-"}%</div>
            <div>Braki: {dane?.braki ?? "-"}</div>
            <div>Wyprodukowana: {dane?.iloscWyprodukowana ?? "-"}</div>
          </div>
        </div>

        {/* Awarie i konserwacje */}
        <div className="col-span-1 md:col-span-3 flex gap-4">
          <div className="flex-1 p-2 bg-red-600 text-white rounded flex items-center justify-center">
            <Wrench className="mr-2 w-5 h-5" /> Awarie:{" "}
            {dane?.awarie?.toFixed(1) ?? "-"} min
          </div>
          <div className="flex-1 p-2 bg-yellow-500 text-black rounded flex items-center justify-center">
            <Settings className="mr-2 w-5 h-5" /> Konserwacje:{" "}
            {dane?.konserwacje?.toFixed(1) ?? "-"} min
          </div>
        </div>

        {/* Przerwy i sprzątanie */}
        <div className="col-span-1 md:col-span-3 flex gap-4">
          <div className="flex-1 p-2 bg-gray-200 text-black rounded flex items-center justify-center">
            Przerwa: {dane?.przerwa ?? "-"} min
          </div>
          <div className="flex-1 p-2 bg-gray-300 text-black rounded flex items-center justify-center">
            Sprzątanie: {dane?.sprzatanie ?? "-"} min
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
