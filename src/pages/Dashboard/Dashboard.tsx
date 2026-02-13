import { useState } from "react";
import { ChartRadialText } from "@/components/Charts/GaugeChart";
import { ChartAreaDefault } from "@/components/Charts/AreaChart";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [showChart, setShowChart] = useState(false);

  const dane = {
    dostepnosc: 41,
    jakosc: 55,
    oee: 90,
    wykorzystanie: 79.1,
  };

  const wydajnoscZmiana = Array.from({ length: 33 }, (_, index) => {
    const minuteOfShift = index * 15;
    const hour = 6 + Math.floor(minuteOfShift / 60);
    const minute = minuteOfShift % 60;
    const timeLabel = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

    let wydajnosc = 78;

    if (hour < 12) {
      wydajnosc = 58 + (minuteOfShift / (6 * 60)) * 20 + ((index % 4) - 1.5) * 0.3;
    } else if (hour < 13 || (hour === 13 && minute <= 30)) {
      wydajnosc = 78 + ((index % 3) - 1) * 0.2;
    } else {
      wydajnosc = 78.5 + (index - 30) * 0.3;
    }

    return {
      godzina: timeLabel,
      wydajnosc: Number(wydajnosc.toFixed(1)),
    };
  });

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
          <ChartAreaDefault wydajnoscZmiana={wydajnoscZmiana} />
        ) : (
          <ChartRadialText label="Wykorzystanie" value={dane.wykorzystanie} large />
        )}
      </div>

      {/* Środkowa część: Pozostałe gauge */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ChartRadialText label="Dostępność" value={dane.dostepnosc} />
        <ChartRadialText label="Jakość" value={dane.jakosc} />
        <ChartRadialText label="OEE" value={dane.oee} />
      </div>

    
    </div>
  );
};

export default Dashboard;
