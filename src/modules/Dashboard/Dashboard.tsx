import { Button } from "@shopify/polaris";
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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const
    }
  }
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data = {
  labels,
  datasets: [
    {
      label: "Dataset",
      data: [35, 99, 85, 19, 11, 60, 10],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)"
    }
  ]
};

const DashBoard = () => {
  return (
    <div>
      <h1 className='text-2xl text-[#303030] font-semibold px-4 py-10'>DashBoard</h1>

      <div>
        <Button size='medium'>Add product</Button>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};
export default DashBoard;
