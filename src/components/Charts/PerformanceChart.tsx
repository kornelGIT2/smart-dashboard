"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

type PerformanceChartProps = {
  data: number[];
};

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  const chartData = {
    labels: data.map((_, i) => i + 1), // np. godziny zmiany lub minuty
    datasets: [
      {
        label: "Wydajność",
        data,
        borderColor: "#4f46e5", // fioletowy z Tailwind
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 0, // brak punktów na linii
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: true, beginAtZero: true, max: 100 },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 h-48">
      <h3 className="text-sm font-semibold mb-2 text-gray-700">
        Wydajność zmiany
      </h3>
      <Line data={chartData} options={options} />
    </div>
  );
};
