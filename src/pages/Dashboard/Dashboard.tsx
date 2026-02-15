import {  useState } from "react";
import { ChartRadialText } from "@/components/Charts/GaugeChart";
import { ChartAreaDefault } from "@/components/Charts/AreaChart";
import { Button } from "@/components/ui/button";
import { useGetHistoryMachineData, useGetLatestMachineData } from "@/hooks/useMachineData";

const toPercent = (value: number) => (value <= 1 ? value * 100 : value);

const Dashboard = () => {
  const [showChart, setShowChart] = useState(false);
  const { data: latestMachineData, isLoading, error } = useGetLatestMachineData(); //on reload fetch latest data
  const { data: historyMachineData } = useGetHistoryMachineData(); //fetch history data for area chart

  if (isLoading) {
    return <div>Ładowanie danych...</div>;
  }

  const dane = latestMachineData || {
    dostepnosc: 41,
    jakosc: 55,
    oee: 90,
    wykorzystanie: 79.1,
  };

  

  if(error) {
    return <div className="text-red-500">Błąd podczas ładowania danych: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Górna część: Wskaźnik wykorzystania */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 items-start">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <Button
            variant="outline"
            onClick={() => setShowChart((previous) => !previous)}
          >
            {showChart ? "Pokaż wskaźnik wykorzystania" : "Pokaż wykres"}
          </Button>
        </div>

        {showChart ? (
          <ChartAreaDefault data={historyMachineData} />
        ) : (
          <ChartRadialText label="Wykorzystanie" value={toPercent(dane.wykorzystanie)} large />
        )}
      </div>

      {/* Środkowa część: Pozostałe gauge */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ChartRadialText label="Dostępność" value={toPercent(dane.dostepnosc)} />
        <ChartRadialText label="Jakość" value={toPercent(dane.jakosc)} />
        <ChartRadialText label="OEE" value={toPercent(dane.oee)} />
      </div>

    
    </div>
  );
};

export default Dashboard;
