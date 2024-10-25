import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  days: number | null;
  onTotalRevenue: (total: number) => void;
}

const BarChart = ({ days, onTotalRevenue }: BarChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      }
    }
  };

  const fullData = [560, 680, 310, 395, 530, 595, 600, 490, 430, 550, 670, 720, 800];
  const displayedData = days !== null ? fullData.slice(0, days) : fullData;
  const labels = Array.from({ length: displayedData.length }, (_, i) => `Day ${i + 1}`);

  useEffect(() => {
    const totalRevenue = displayedData.reduce((acc, value) => acc + value, 0);
    onTotalRevenue(totalRevenue);
  }, [days]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dataset1",
        data: displayedData,
        backgroundColor: "rgba(251, 180, 194, 1)"
      }
    ]
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
