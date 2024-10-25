import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
  days: number | null;
  onTotalSubscriptions: (total: number) => void;
}

const LineChart = ({ days, onTotalSubscriptions }: LineChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      }
    }
  };
  const fullData = [35, 99, 85, 19, 11, 60, 10, 42, 55, 23, 77, 19, 38];
  const displayedData = days !== null ? fullData.slice(0, days) : fullData;
  const labels = Array.from({ length: displayedData.length }, (_, i) => `Day ${i + 1}`);

  useEffect(() => {
    const totalSubscriptions = displayedData.reduce((acc, value) => acc + value, 0);
    onTotalSubscriptions(totalSubscriptions);
  }, [days]);

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset",
        data: displayedData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      }
    ]
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
