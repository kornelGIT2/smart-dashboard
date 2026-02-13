import { ChartRadialText } from "@/components/Charts/GaugeChart";
import RaportStratForm from "@/components/RaportForm/RaportStratForm";
import { PerformanceChart } from "@/components/Charts/PerformanceChart";

const Dashboard = () => {
  const dane = {
    dostepnosc: 41,
    jakosc: 55,
    oee: 90,
    wykorzystanie: 44,
  };

  const wydajnoscZmiana = [50, 52, 55, 60, 62, 64, 66, 70]; // dane od początku zmiany

  return (
    <div className="flex flex-col gap-6">
      {/* Górna część: Wydajność + mini wykres */}

      <div className="flex gap-4">
        {/* Lewa połowa: gauge wydajności */}
        <div className="w-full flex justify-center">
          <ChartRadialText label="Wydajność" value={dane.wykorzystanie} />
        </div>

        {/* Prawa połowa: mini wykres */}
        <div className="w-full flex justify-center">
          <PerformanceChart data={wydajnoscZmiana} />
        </div>
      </div>

      {/* Środkowa część: Pozostałe gauge */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ChartRadialText label="Dostępność" value={dane.dostepnosc} />
        <ChartRadialText label="Jakość" value={dane.jakosc} />
        <ChartRadialText label="OEE" value={dane.oee} />
      </div>

      {/* Dolna część: Raportowanie strat */}
      <div className="w-full mt-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Raportowanie strat</h2>
          <RaportStratForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
